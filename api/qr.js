module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
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
};
