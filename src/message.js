function setupMessageListener(client) {
  client.onMessage((message) => {
    if (message.body === 'teste') {
      client.sendText(message.from, 'olá tudo bem? eh so um teste o meu PC que esta mandando isso :)')
        .then((result) => console.log('Mensagem enviada com sucesso', result))
        .catch((err) => console.error('Erro ao enviar mensagem', err));
    }
  });
}

module.exports = setupMessageListener;
