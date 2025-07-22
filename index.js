module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <h1>🤖 Bot WhatsApp - Controle de Gastos</h1>
    <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
    <p>✅ Servidor funcionando!</p>
    <a href="/api/qr">📱 Conectar WhatsApp</a>
  `);
};
