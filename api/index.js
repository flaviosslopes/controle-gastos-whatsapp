const url = require('url');

module.exports = (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if (pathname === '/qr') {
      const html = `<!DOCTYPE html>
<html>
<head>
    <title>QR Code WhatsApp</title>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial; text-align: center; padding: 20px;">
    <h1>🤖 WhatsApp QR Code</h1>
    <div style="border: 2px dashed #25D366; padding: 30px; margin: 20px;">
        <h2>📱 QR Code aqui</h2>
        <p>Status: Funcionando!</p>
    </div>
    <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
    <a href="/">← Voltar</a>
</body>
</html>`;
      return res.status(200).send(html);
    }
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Bot WhatsApp</title>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial; text-align: center; padding: 20px;">
    <h1>🤖 Bot WhatsApp</h1>
    <p>✅ Servidor funcionando!</p>
    <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
    <a href="/qr" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">📱 Ver QR Code</a>
</body>
</html>`;
    
    res.status(200).send(html);
    
  } catch (error) {
    res.status(500).send('Erro: ' + error.message);
  }
};
