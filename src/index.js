const express = require('express');
const path = require('path');
const wppconnect = require('@wppconnect-team/wppconnect');
const setupMessageListener = require('./message');
const sendMessages = require('./jobs/sendMessages');
const contactsRouter = require('./routes/contacts');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/contacts', contactsRouter);
app.use(express.static(path.join(__dirname, 'views')));

let clientInstance = null;

wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR);
      const matches = base64Qr.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) return new Error('QR inválido');
      const buffer = Buffer.from(matches[2], 'base64');
      require('fs').writeFile('out.png', buffer, 'binary', (err) => {
        if (err) console.error('Erro ao salvar QR:', err);
      });
    },
    logQR: false,
  })
  .then((client) => {
    clientInstance = client;
    setupMessageListener(client);

    // Agenda para rodar a cada 1 minuto
    cron.schedule('* * * * *', () => {
      sendMessages(client);
    });
  })
  .catch((error) => console.log('Erro ao iniciar wppconnect:', error));

// Servir o formulário web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.listen(8080, () => {
  console.log('Servidor web rodando em http://localhost:8080');
});
