const db = require('../config/db');

exports.getPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;

  db.query(
    'INSERT INTO posts(title,content) VALUES(?,?)',
    [title, content],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Post Created' });
    }
  );
};

exports.updatePost = (req, res) => {
  const { title, content } = req.body;

  db.query(
    'UPDATE posts SET title=?, content=? WHERE id=?',
    [title, content, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Post Updated' });
    }
  );
};

exports.deletePost = (req, res) => {
  db.query(
    'DELETE FROM posts WHERE id=?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Post Deleted' });
    }
  );
};
