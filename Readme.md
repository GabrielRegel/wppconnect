# 📲 WPPConnect WhatsApp Sender

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
[![WPPConnect](https://img.shields.io/badge/WPPConnect-Library-blueviolet)](https://github.com/wppconnect-team/wppconnect)

Sistema automatizado de envio de mensagens via WhatsApp com cadastro de contatos via interface web e integração com banco de dados MySQL. Desenvolvido com Node.js e utilizando a biblioteca [@wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect).

---

## ✨ Funcionalidades

- ✅ Envio automático de mensagens via WhatsApp
- 🗃️ Cadastro de contatos com nome, sobrenome e telefone
- 🔁 Verificação a cada 1 minuto para envio de mensagens pendentes
- 🌐 Interface web simples e funcional
- 🔐 Conexão segura com banco MySQL via variáveis de ambiente
- 🖼️ Geração e exibição de QR Code para autenticação
- 📊 Status de envio controlado diretamente no banco

---

## 📦 Pré-requisitos

- Node.js **18.x** ou superior
- npm (já incluso com o Node.js)
- MySQL Server
- Git (opcional, para clonar o projeto)

---

## ⚙️ Instalação do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências

```bash
npm install
```

Ou instale os pacotes principais individualmente:

```bash
npm install express mysql2 @wppconnect-team/wppconnect node-cron
```

### 3. Configure o banco de dados

No MySQL, crie o banco e a tabela:

```sql
CREATE DATABASE wppconnect;

USE wppconnect;

CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  msg_has_sended TINYINT DEFAULT 0
);
```

### 4. Configure o `.env`

Crie o arquivo `.env` na raiz do projeto com as credenciais do banco:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=wppconnect
```

> **Importante:** não envie esse arquivo para o Git. Veja a seção [.gitignore](#🛡️-gitignore) abaixo.

---

## 🚀 Rodando o Projeto

```bash
npm start
```

- Acesse: [http://localhost:8080](http://localhost:8080)
- Escaneie o QR Code exibido no terminal para autenticar no WhatsApp
- O QR também será salvo como `out.png` no diretório raiz

---

## 🌐 Utilizando a Interface Web

1. Acesse [http://localhost:8080](http://localhost:8080)
2. Preencha o formulário com:
   - Nome
   - Sobrenome
   - Número de telefone (com DDI e DDD, ex: `5511999999999`)
3. Clique em **Adicionar**
4. O contato será salvo no banco e receberá a mensagem automaticamente

---

## ⏱️ Como Funciona o Envio Automático

- Um job roda a cada minuto com o pacote `node-cron`
- Ele busca todos os contatos com `msg_has_sended = 0`
- Envia uma mensagem personalizada usando o nome do contato
- Após o envio, o contato é marcado como `msg_has_sended = 1`

---

## 🧱 Estrutura de Pastas

```
src/
├── jobs/
│   └── sendMessages.js        # Agendamento e envio de mensagens
│
├── routes/
│   └── contacts.js            # Rotas da API
│
├── views/
│   └── form.html              # Interface web com formulário (Bootstrap)
│
├── bdConnection.js            # Conexão com banco MySQL
├── bdRequisitions.js          # Consultas e updates no banco
├── index.js                   # Inicialização do app
├── message.js                 # Listener de mensagens recebidas
```

---

## 🛡️ .gitignore

Adicione um arquivo `.gitignore` com:

```
node_modules/
.env
out.png
tokens/
```

---

## ❓ Dúvidas Frequentes

**1. O WhatsApp precisa estar online?**  
Sim. A autenticação via QR Code é obrigatória. O WhatsApp Web precisa permanecer ativo.

**2. O número precisa estar salvo nos contatos?**  
Não. Basta que o número esteja no WhatsApp.

**3. Como reenviar uma mensagem?**  
No banco de dados, altere o campo `msg_has_sended` para `0`.

**4. Como alterar a mensagem enviada?**  
Edite o conteúdo no arquivo `src/jobs/sendMessages.js`.

---

## 📄 Licença

Este projeto está licenciado sob a [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br).

> **Você pode copiar, modificar e criar derivados — desde que atribua o crédito a Gabriel Regel e compartilhe sob a mesma licença.**