module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  const url = req.url || '/';
  
  if (url === '/qr' || url === '/api/qr') {
    // Página QR Code
    const qrHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>QR Code WhatsApp Bot</title>
          <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .qr-placeholder { border: 2px dashed #25D366; padding: 50px; margin: 20px 0; border-radius: 10px; background: #f9f9f9; }
              .btn { display: inline-block; padding: 10px 20px; background: #25D366; color: white; text-decoration: none; border-radius: 5px; margin: 10px; }
              .btn:hover { background: #128C7E; }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🤖 WhatsApp Bot - QR Code</h1>
              <div class="qr-placeholder">
                  <h2>📱 QR Code será exibido aqui</h2>
                  <p>Em breve: Integração com WPPConnect</p>
                  <p>Status: <strong style="color: #25D366;">Rota funcionando!</strong></p>
              </div>
              <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
              <a href="/" class="btn">← Voltar ao início</a>
          </div>
      </body>
      </html>
    `;
    return res.status(200).send(qrHtml);
  }
  
  // Página principal
  const mainHtml = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bot WhatsApp - Controle de Gastos</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .btn { display: inline-block; padding: 15px 30px; background: #25D366; color: white; text-decoration: none; border-radius: 5px; margin: 10px; font-size: 18px; }
            .btn:hover { background: #128C7E; }
            .status { color: #25D366; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🤖 Bot WhatsApp - Controle de Gastos</h1>
            <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
            <p class="status">✅ Servidor funcionando!</p>
            <a href="/qr" class="btn">📱 Conectar WhatsApp</a>
            <br
