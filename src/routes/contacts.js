const express = require('express');
const db = require('../bdConnection');
const router = express.Router();

router.post('/add', (req, res) => {
  const { firstname, lastname, phone_number } = req.body;
  if (!firstname || !lastname || !phone_number) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }
  db.query(
    'INSERT INTO contatos (firstname, lastname, phone_number, msg_has_sended) VALUES (?, ?, ?, 0)',
    [firstname, lastname, phone_number],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Erro ao inserir contato.' });
      res.json({ success: true, id: result.insertId });
    }
  );
});

module.exports = router;