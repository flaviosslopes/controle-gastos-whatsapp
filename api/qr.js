export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>QR Code Test</title>
        <meta charset="UTF-8">
      </head>
      <body style="text-align:center; font-family:Arial; padding:20px;">
        <h1>🤖 WhatsApp QR Code</h1>
        <div style="border: 2px solid #25D366; padding: 30px; margin: 20px;">
          <p>📱 QR Code:</p>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://web.whatsapp.com" alt="QR Code" style="border: 1px solid #ccc;">
          <p><strong>Status:</strong> QR Code carregado!</p>
        </div>
        <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none;">← Voltar</a>
      </body>
    </html>
  `);
}
