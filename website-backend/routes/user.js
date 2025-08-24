const express = require("express");
const router = express.Router();
const { User } = require('../models');

// GET user details by ID
router.get("/:id/details", /* TODO: Add authentication and authorization middleware */ async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // don't return password
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST route to update user details
router.post('/:id/details', /* TODO: Add authentication and authorization middleware */ async (req, res) => {
  const { id } = req.params;
  const {
    // Personal Information
    firstName, lastName, email, phone,
    
    // Shipping Address  
    shippingAddress, shippingCity, shippingState, shippingPincode,
    
    // Billing Address
    billingAddress, billingCity, billingState, billingPincode
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // ✅ Update Personal Information
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    
    // ✅ Update Shipping Address Information
    if (shippingAddress !== undefined) user.streetAddress = shippingAddress;
    if (shippingCity !== undefined) user.city = shippingCity;
    if (shippingState !== undefined) user.state = shippingState;
    if (shippingPincode !== undefined) user.zipCode = shippingPincode;

    // ✅ Update Billing Address Information
    if (billingAddress !== undefined) user.billingAddress = billingAddress;
    if (billingCity !== undefined) user.billingCity = billingCity;
    if (billingState !== undefined) user.billingState = billingState;
    if (billingPincode !== undefined) user.billingZipCode = billingPincode;

    await user.save();

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('❌ Error updating user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
