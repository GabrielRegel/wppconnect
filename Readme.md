# WPPConnect WhatsApp Sender

Este projeto é uma aplicação Node.js que envia mensagens automáticas via WhatsApp para contatos cadastrados em um banco de dados MySQL, utilizando [@wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect). Possui uma interface web para cadastro de contatos e envia mensagens personalizadas automaticamente a cada minuto.

---

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação do Node.js](#instalação-do-nodejs)
- [Clonando o Projeto](#clonando-o-projeto)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Configuração de Variáveis de Ambiente (.env)](#configuração-de-variáveis-de-ambiente-env)
- [Instalação das Dependências](#instalação-das-dependências)
- [Rodando o Projeto](#rodando-o-projeto)
- [Utilizando a Interface Web](#utilizando-a-interface-web)
- [Como funciona o envio automático](#como-funciona-o-envio-automático)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [O que não vai para o Git (gitignore)](#o-que-não-vai-para-o-git-gitignore)
- [Dúvidas Frequentes](#dúvidas-frequentes)

---

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm (geralmente já vem com o Node.js)
- MySQL Server

---

## Instalação do Node.js

1. Baixe o instalador em: https://nodejs.org/
2. Siga o passo a passo da instalação.
3. Verifique a instalação no terminal/cmd:
   ```
   node -v
   npm -v
   ```

---

## Clonando o Projeto

```sh
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

---

## Configuração do Banco de Dados

1. Crie um banco de dados MySQL, por exemplo: `wppconnect`.
2. Crie a tabela de contatos:

```sql
CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  msg_has_sended TINYINT DEFAULT 0
);
```

---

## Configuração de Variáveis de Ambiente (.env)

Crie um arquivo chamado `.env` na raiz do projeto (NÃO suba este arquivo para o Git):

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=wppconnect
```

**Dica:**  
Adicione `.env` ao seu `.gitignore` para evitar subir dados sensíveis.

---

## Instalação das Dependências

No terminal, dentro da pasta do projeto, execute:

```sh
npm install
```

Se faltar algum pacote, instale manualmente, por exemplo:

```sh
npm install express mysql2 @wppconnect-team/wppconnect node-cron
```

---

## Rodando o Projeto

No terminal, execute:

```sh
npm start
```

- O servidor web estará disponível em: [http://localhost:8080](http://localhost:8080)
- O QR Code para autenticação do WhatsApp será exibido no terminal e salvo como `out.png` na pasta do projeto.

---

## Utilizando a Interface Web

1. Acesse [http://localhost:8080](http://localhost:8080)
2. Preencha o formulário com nome, sobrenome e telefone (apenas números, com DDI e DDD, ex: 5511999999999).
3. Clique em "Adicionar".
4. O contato será salvo no banco de dados e receberá uma mensagem automática em até 1 minuto.

---

## Como funciona o envio automático

- A cada 1 minuto, o sistema verifica todos os contatos com `msg_has_sended = 0`.
- Envia uma mensagem personalizada para cada contato, usando o nome cadastrado.
- Após o envio, atualiza o campo `msg_has_sended` para `1` no banco.

---

## Estrutura de Pastas

```
src/
│
├── jobs/
│   └── sendMessages.js         # Lógica de envio agendado
│
├── routes/
│   └── contacts.js             # Rotas da API para contatos
│
├── views/
│   └── form.html               # Formulário web (Bootstrap)
│
├── bdConnection.js             # Conexão com o MySQL
├── bdRequisitions.js           # Funções de consulta/atualização no banco
├── index.js                    # Inicialização do app e servidor web
├── message.js                  # Listener de mensagens recebidas
```

---

## O que não vai para o Git (.gitignore)

Crie um arquivo `.gitignore` na raiz do projeto com o seguinte conteúdo:

```
node_modules/
.env
out.png
tokens/
```

---

## Dúvidas Frequentes

**1. O WhatsApp precisa estar conectado?**  
Sim, você precisa escanear o QR Code com o WhatsApp Web para autenticar.

**2. O número precisa estar salvo nos contatos do WhatsApp?**  
Não, basta que o número seja válido e tenha WhatsApp.

**3. Como reiniciar o envio para um contato?**  
Altere o campo `msg_has_sended` para `0` no banco de dados.

**4. Como mudar a mensagem enviada?**  
Edite o arquivo `src/jobs/sendMessages.js` e personalize a variável `mensagem`.

---

## Créditos

- [WPPConnect](https://github.com/wppconnect-team/wppconnect)
- [Bootstrap](https://getbootstrap.com/)

---

**Dúvidas ou sugestões? Abra uma