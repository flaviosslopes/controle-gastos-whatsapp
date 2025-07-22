module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR Code WhatsApp Bot</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; }
            .qr-placeholder { border: 2px dashed #ccc; padding: 50px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 WhatsApp Bot - QR Code</h1>
            <div class="qr-placeholder">
                <h2>📱 QR Code será exibido aqui</h2>
                <p>Aguarde a implementação do WPPConnect...</p>
            </div>
            <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
            <a href="/">← Voltar ao início</a>
        </div>
    </body>
    </html>
  `;
  
  res.status(200).send(html);
};
