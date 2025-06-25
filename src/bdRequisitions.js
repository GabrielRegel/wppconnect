const db = require('./bdConnection');

function getAllContacts(callback) {
  db.query('SELECT * FROM contatos', (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function setMessageSent(id, callback) {
  db.query('UPDATE contatos SET msg_has_sended = 1 WHERE id = ?', [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
}

module.exports = {
  getAllContacts,
  setMessageSent,
};
