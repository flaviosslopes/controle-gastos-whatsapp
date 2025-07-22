export default function handler(req, res) {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  
  if (pathname === '/qr') {
    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code WhatsApp</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="text-align:center; font-family:Arial; padding:20px;">
          <h1>🤖 WhatsApp QR Code</h1>
          <div style="border: 2px dashed #25D366; padding: 30px; margin: 20px; border-radius: 10px;">
            <p id="loading">📱 Carregando QR Code...</p>
            <div id="qr-display"></div>
            <p><strong>Status:</strong> <span id="status">Conectando...</span></p>
          </div>
          <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">← Voltar</a>
          
          <script>
            setTimeout(function() {
              const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WhatsApp-Bot-' + Date.now();
              document.getElementById('loading').style.display = 'none';
              document.getElementById('qr-display').innerHTML = '<img src="' + qrUrl + '" alt="QR Code" style="border: 1px solid #ccc;">';
              document.getElementById('status').textContent = 'QR Code gerado!';
            }, 2000);
          </script>
        </body>
      </html>
    `);
  }
  
  return res.status(200).send(`
    <html>
      <head>
        <title>Bot WhatsApp</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="text-align:center; font-family:Arial; padding:20px;">
        <h1>🤖 Bot WhatsApp - Controle de Gastos</h1>
        <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px;">
          <p>✅ <strong>Servidor funcionando!</strong></p>
          <p>🕒 Hora: ${new Date().toLocaleString('pt-BR')}</p>
          <p>📊 Bot para controle de gastos via WhatsApp</p>
        </div>
        <a href="/qr" style="background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px;">
          📱 Ver QR Code
        </a>
      </body>
    </html>
  `);
}
