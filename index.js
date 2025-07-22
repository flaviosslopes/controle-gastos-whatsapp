const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>🤖 Bot WhatsApp - Controle de Gastos</h1>
    <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
    <p>✅ Servidor funcionando!</p>
    <a href="/qr">📱 Conectar WhatsApp</a>
  `);
});

app.get('/qr', (req, res) => {
  res.send(`
    <html>
      <head><title>QR Code WhatsApp</title></head>
      <body>
        <h1>🤖 Conectar WhatsApp Bot</h1>
        <p>📱 Em breve: QR Code aqui</p>
        <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
        <a href="/">← Voltar</a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`�� Servidor rodando na porta ${PORT}`);
});

module.exports = app;
