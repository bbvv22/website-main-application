const express = require('express');
const router = express.Router();
const { Order, OrderItem, ReturnRequest, User, Product, sequelize, Sequelize } = require('../models');
const transporter = require('../utils/mailer');

// --- Email Sending Functions ---

async function sendOrderConfirmationEmail(customerInfo, order) {
    try {
        const customerName = `${customerInfo.firstName || ''} ${customerInfo.lastName || ''}`.trim();
        const subtotal = order.total_amount + order.discount_amount;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: customerInfo.email,
            bcc: process.env.TEAM_EMAIL_ADDRESS,
            subject: `Your Dwapor Order Confirmation #${order.id.split('-')[0]} `,
            html: `<h2>Thank you for your order!</h2>
                   <p>Hi ${customerName},</p>
                   <p>We've received your order and will process it shortly.</p>
                   <h3>Order Summary</h3>
                   <p><strong>Order ID:</strong> ${order.id}</p>
                   <hr>
                   <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
                   ${order.discount_amount > 0 ? `<p><strong>Discount (${order.coupon_code}):</strong> -₹${order.discount_amount.toFixed(2)}</p>` : ''}
                   <p><strong>Total:</strong> ₹${order.total_amount.toFixed(2)}</p>
                   <hr>
                   <h4>Items:</h4>
                   <ul>
                     ${order.items.map(item => `<li>${item.name} (x${item.quantity}) - ₹${item.price.toFixed(2)}</li>`).join('')}
                   </ul>
                   <h4>Shipping to:</h4>
                   <p>${order.shipping_address.address}, ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}</p>
                   <p>Thank you for shopping with Dwapor!</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log(`✅ Order confirmation email sent to ${customerInfo.email}`);
    } catch (error) {
        console.error(`❌ Error sending order confirmation email:`, error);
    }
}

async function sendReturnExchangeNotificationEmail(userEmail, order, requestedItems, requestType, reason) {
    try {
        const itemsList = requestedItems.map(item => `<li>${item.name} (Quantity: ${item.quantity})</li>`).join('');

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: userEmail,
            bcc: process.env.TEAM_EMAIL_ADDRESS,
            subject: `Your Dwapor ${requestType} Request Confirmation - Order #${order.id.split('-')[0]} `,
            html: `<h2>${requestType.charAt(0).toUpperCase() + requestType.slice(1)} Request Received</h2>
                   <p>Hi,</p>
                   <p>We have received your request for a ${requestType} for Order ID: <strong>${order.id}</strong> for the following items:</p>
                   <ul>
                     ${itemsList}
                   </ul>
                   <p><strong>Reason:</strong> ${reason}</p>
                   <p>Our team will review your request and get back to you shortly.</p>
                   <p>Thank you,</p>
                   <p>The Dwapor Team</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log(`✅ Return/Exchange notification sent to ${userEmail}`);
    } catch (error) {
        console.error(`❌ Error sending return/exchange notification email:`, error);
    }
}


// Get all orders for a user
router.get('/', async (req, res) => {
  res.status(400).json({ message: 'Please provide a userId to fetch orders. Example: /api/orders/:userId' });
});

router.get('/single/:orderId', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId, {
      include: [{
        model: OrderItem,
        as: 'items'
      }]
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching single order:', error);
    res.status(500).json({ error: 'Failed to fetch single order' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.params.userId },
      include: [{
        model: OrderItem,
        as: 'items'
      }]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  console.log('📥 POST /api/orders route hit');
  const t = await sequelize.transaction();
  try {
    const { userId, items, total, discount, couponCode, customerInfo, shippingAddress, billingAddress, paymentMethod, orderDate, status } = req.body;

    const newOrder = await Order.create({
      user_id: userId,
      total_amount: total,
      discount_amount: discount,
      coupon_code: couponCode,
      status: status,
      order_date: orderDate,
      customer_info: customerInfo,
      shipping_address: shippingAddress,
      billing_address: billingAddress,
      payment_method: paymentMethod,
    }, { transaction: t });

    for (const item of items) {
      await OrderItem.create({
        orderId: newOrder.id,
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      }, { transaction: t });
    }

    await t.commit();

    const newOrderWithItems = await Order.findByPk(newOrder.id, {
      include: [{ model: OrderItem, as: 'items' }]
    });

    // Send confirmation email
    sendOrderConfirmationEmail(customerInfo, newOrderWithItems);

    res.status(201).json(newOrderWithItems);
  } catch (error) {
    await t.rollback();
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order status and delivery date
router.put('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, delivery_date } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (status) {
      order.status = status;
    }
    if (delivery_date) {
      order.delivery_date = delivery_date;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Create a new return/exchange request
router.post('/returns', async (req, res) => {
  try {
    const { order_id, order_item_id, user_id, request_type, reason } = req.body;

    const newReturnRequest = await ReturnRequest.create({
      order_id,
      order_item_id,
      user_id,
      request_type,
      reason,
      status: 'pending', // Default status
    });

    res.status(201).json(newReturnRequest);
  } catch (error) {
    console.error('Error creating return/exchange request:', error);
    res.status(500).json({ error: 'Failed to create return/exchange request' });
  }
});

// Handle return/exchange request and update order status
router.post('/request-action', async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { orderId, requestType, reason, otherReason, userId, selectedItemIds } = req.body;

    const order = await Order.findByPk(orderId, {
      include: [{ model: OrderItem, include: [Product] }] // Include OrderItem and Product
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (!selectedItemIds || !Array.isArray(selectedItemIds) || selectedItemIds.length === 0) {
      return res.status(400).json({ message: 'Please select items to return/exchange.' });
    }

    const requestedItems = [];
    const returnRequests = [];

    for (const itemId of selectedItemIds) {
      const orderItem = order.OrderItems.find(item => item.id === itemId);
      if (!orderItem) {
        return res.status(404).json({ message: `Item with ID ${itemId} not found in this order.` });
      }

      const existingRequest = await ReturnRequest.findOne({
        where: { order_item_id: itemId, request_type: requestType }
      });

      if (existingRequest) {
        return res.status(400).json({ message: `A ${requestType} request for the item "${orderItem.Product.name}" already exists.` });
      }

      const newReturnRequest = await ReturnRequest.create({
        order_id: orderId,
        order_item_id: itemId, // Pass order_item_id
        user_id: userId,
        request_type: requestType,
        reason: reason === 'Other' ? otherReason : reason,
        status: 'pending',
      }, { transaction: t });
      requestedItems.push(orderItem);
      returnRequests.push(newReturnRequest);
    }

    let newStatus;
    if (requestType === 'return') {
      newStatus = 'Return Initiated';
    } else if (requestType === 'exchange') {
      newStatus = 'Exchange Initiated';
    } else {
      return res.status(400).json({ error: 'Invalid request type' });
    }

    order.status = newStatus;
    await order.save({ transaction: t });

    const user = await User.findByPk(userId);
    if (!user) {
        console.error('User not found for return notification');
    } else {
        // Pass requestedItems to the email function
        sendReturnExchangeNotificationEmail(user.email, order, requestedItems, requestType, reason === 'Other' ? otherReason : reason);
    }

    await t.commit();

    res.status(200).json({ message: `${requestType} initiated successfully for selected items.`, returnRequests });
  } catch (error) {
    await t.rollback();
    console.error(`Error handling ${req.body.requestType} request:`, error.stack); // Changed to error.stack
    if (error.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: 'Invalid item selected for return/exchange.' });
    }
    res.status(500).json({ error: `Failed to handle ${req.body.requestType} request` });
  }
});

module.exports = router;

