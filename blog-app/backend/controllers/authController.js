const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users(name,email,password) VALUES(?,?,?)',
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: 'User Registered' });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.json({ message: 'User not found' });
      }

      const valid = await bcrypt.compare(password, result[0].password);

      if (!valid) {
        return res.json({ message: 'Invalid Password' });
      }

      const token = jwt.sign({ id: result[0].id }, 'secretkey');

      res.json({ token });
    }
  );
};
