const router = require('express').Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  console.log('🔥 ORDER ROUTE REACHED');
  try {
    console.log('========== ORDER REQUEST ==========');
    console.log('User:', req.user);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { items, total, delivery, customer } = req.body;

    const info = delivery || customer;

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: 'Your cart is empty.',
      });
    }

    if (
      !info ||
      !info.name ||
      !info.phone ||
      !info.address
    ) {
      return res.status(400).json({
        message: 'Complete delivery information is required.',
      });
    }

    const cleanItems = items.map(item => ({
      name: String(item.name || 'Plant'),
      price: Number(item.price || 0),
      quantity: Number(item.quantity || 1),
    }));

    const cleanTotal = Number(
      total ??
      cleanItems.reduce(
        (sum, item) =>
          sum + item.price * item.quantity,
        0
      )
    );

    // Make sure the authenticated user ID exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: 'User authentication information is missing.',
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      items: cleanItems,
      total: cleanTotal,
      delivery: {
        name: String(info.name),
        phone: String(info.phone),
        address: String(info.address),
      },
    });

    console.log('ORDER CREATED:', order._id);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
    });

  } catch (error) {
    console.error('========== ORDER ERROR ==========');
    console.error(error);
    console.error(error.message);

    return res.status(500).json({
      message: error.message || 'Could not place order',
    });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    console.error('GET ORDERS ERROR:', error);

    res.status(500).json({
      message: error.message || 'Could not load orders',
    });
  }
});


module.exports = router;