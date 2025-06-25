const { getAllContacts, setMessageSent } = require('../bdRequisitions');

async function sendMessages(client) {
  getAllContacts(async (err, contatos) => {
    if (err) {
      console.error('Erro ao buscar contatos:', err);
      return;
    }
    for (const contato of contatos) {
      if (contato.msg_has_sended === 0) {
        let numero = contato.phone_number;
        if (!numero) {
          console.error(`Contato id ${contato.id} sem número!`);
          continue;
        }
        if (!numero.endsWith('@c.us')) {
          numero = numero.replace(/\D/g, '') + '@c.us';
        }
        // Mensagem personalizada
        const mensagem = `Olá ${contato.firstname}, tudo bem? 😊\n\nEsta é uma mensagem automática enviada pelo nosso sistema. Se precisar de algo, é só responder!`;
        try {
          await client.sendText(numero, mensagem);
          console.log(`Mensagem enviada para ${numero}`);
          setMessageSent(contato.id, (err) => {
            if (err) {
              console.error(`Erro ao atualizar contato ${contato.id}:`, err);
            } else {
              console.log(`Contato ${contato.id} atualizado com sucesso.`);
            }
          });
        } catch (e) {
          console.error(`Erro ao enviar mensagem para ${numero}:`, e);
        }
      }
    }
  });
}

module.exports = sendMessages;