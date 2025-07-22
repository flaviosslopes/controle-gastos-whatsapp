export default function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
  if (pathname === '/qr') {
    return res.status(200).send(`
      <html>
        <body style="text-align:center; font-family:Arial;">
          <h1>🤖 QR Code WhatsApp</h1>
          <p>✅ Página QR funcionando!</p>
          <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
          <a href="/">← Voltar</a>
        </body>
      </html>
    `);
  }
  
  return res.status(200).send(`
    <html>
      <body style="text-align:center; font-family:Arial;">
        <h1>🤖 Bot WhatsApp</h1>
        <p>✅ Servidor funcionando!</p>
        <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
        <a href="/qr">📱 Ver QR Code</a>
      </body>
    </html>
  `);
}
