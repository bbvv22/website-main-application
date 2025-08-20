const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
// If DATABASE_URL is provided, use Postgres. Otherwise, fall back to SQLite for local development.
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
    }
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'db.sqlite'),
    logging: false,
  });
}

// Define Models
class StatusCheck extends Model {}
StatusCheck.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'StatusCheck',
  tableName: 'status_checks',
  timestamps: false,
});

class Order extends Model {}
Order.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Processing',
  },
  delivery_date: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Order',
  tableName: 'orders',
  timestamps: false,
});

class OrderItem extends Model {}
OrderItem.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'order_items',
  timestamps: false,
});

// Associations
Order.hasMany(OrderItem, { as: 'items', onDelete: 'CASCADE', hooks: true });
OrderItem.belongsTo(Order);

class Review extends Model {}
Review.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'reviews',
  timestamps: false,
});


const apiRouter = express.Router();

// Orders
apiRouter.post('/orders', async (req, res) => {
  const { user_id, total_amount, items } = req.body;
  try {
    const result = await sequelize.transaction(async (t) => {
      const order = await Order.create({
        user_id: user_id || 'test_user_id', // Hardcoded for now
        total_amount,
      }, { transaction: t });

      const orderItems = items.map(item => ({ ...item, OrderId: order.id }));
      await OrderItem.bulkCreate(orderItems, { transaction: t });

      return order;
    });
    // We need to fetch the order with the items again to return it in the response
    const finalOrder = await Order.findByPk(result.id, { include: 'items' });
    res.status(201).json(finalOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

apiRouter.get('/orders', async (req, res) => {
  const { user_id } = req.query;
  try {
    const orders = await Order.findAll({
      where: { user_id: user_id || 'test_user_id' }, // Hardcoded for now
      include: 'items',
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

apiRouter.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { user_id } = req.query;
  try {
    const order = await Order.findOne({
      where: { id: orderId, user_id: user_id || 'test_user_id' }, // Hardcoded for now
      include: 'items',
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
});

// Status
apiRouter.post('/status', async (req, res) => {
  const { client_name } = req.body;
  try {
    const statusCheck = await StatusCheck.create({ client_name });
    res.status(201).json(statusCheck);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create status check' });
  }
});

apiRouter.get('/status', async (req, res) => {
  try {
    const statusChecks = await StatusCheck.findAll();
    res.json(statusChecks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve status checks' });
  }
});

// Reviews
apiRouter.post('/reviews', async (req, res) => {
  const { product_id, user_id, rating, comment, name, profession, city } = req.body;
  try {
    const review = await Review.create({
      product_id,
      user_id: user_id || 'test_user_id', // Hardcoded for now
      rating,
      comment,
      name,
      profession,
      city,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review', details: error.message });
  }
});

apiRouter.get('/reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { product_id: productId },
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

app.use('/api', apiRouter);


// Serve React Frontend
// const buildPath = path.resolve(__dirname, '../frontend/build');
// app.use(express.static(buildPath));

// For any other request, serve the React app
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(buildPath, 'index.html'));
// });


// Start the server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
