const express = require('express');

module.exports = (connection) => {
  const router = express.Router();

  // GET /orders/:orderId - Fetch specific order details
  router.get('/:orderId', (req, res) => {
    const orderId = req.params.orderId;

    // Validate input: orderId must be a number
    if (isNaN(orderId)) {
      return res.status(400).json({ error: 'Invalid order ID format' });
    }

    const query = `SELECT * FROM orders WHERE order_id = ?`;

    connection.query(query, [orderId], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(results[0]); // Return the order details
    });
  });

  return router;
};
