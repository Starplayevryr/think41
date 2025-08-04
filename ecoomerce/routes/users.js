const express = require('express');

module.exports = (connection) => {
  const router = express.Router();

  // ✅ Route: GET /users/:id/with-orders (User info + order count)
  router.get('/:id/with-orders', (req, res) => {
    const userId = req.params.id;

    const query = `
      SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.age,
        u.gender,
        u.state,
        u.street_address,
        u.postal_code,
        u.city,
        u.country,
        u.latitude,
        u.longitude,
        u.traffic_source,
        u.created_at,
        COUNT(o.order_id) AS order_count
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      WHERE u.id = ?
      GROUP BY u.id
    `;

    connection.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'User not found' });
      res.json(results[0]);
    });
  });

  // ✅ Route: GET /users/:id/orders (All orders for specific user)
  router.get('/:id/orders', (req, res) => {
    const userId = req.params.id;

    const query = `SELECT * FROM orders WHERE user_id = ?`;

    connection.query(query, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: 'No orders found for this customer' });
      res.json(results);
    });
  });

  // ✅ Route: GET /users (List all users)
  router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  // ✅ Route: POST /users (Add new user)
  router.post('/', (req, res) => {
    const { name, email } = req.body;
    connection.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User added', id: result.insertId });
      }
    );
  });
  
  return router;
};
