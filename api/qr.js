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
          
          <!-- TESTE 1: Quadrado simples -->
          <div style="width: 200px; height: 200px; background: black; margin: 20px auto; position: relative;">
            <div style="width: 180px; height: 180px; background: white; position: absolute; top: 10px; left: 10px;">
              <div style="width: 20px; height: 20px; background: black; position: absolute; top: 10px; left: 10px;"></div>
              <div style="width: 20px; height: 20px; background: black; position: absolute; top: 10px; right: 10px;"></div>
              <div style="width: 20px; height: 20px; background: black; position: absolute; bottom: 10px; left: 10px;"></div>
              <div style="width: 20px; height: 20px; background: black; position: absolute; bottom: 10px; right: 10px;"></div>
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px;">QR</div>
            </div>
          </div>
          
          <p><strong>Status:</strong> QR Code carregado!</p>
          <p><small>📱 Teste visual - você vê um quadrado preto com branco?</small></p>
        </div>
        
        <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none;">← Voltar</a>
        
        <div style="margin-top: 30px; padding: 20px; background: #f0f0f0;">
          <h3>🔍 Debug Info:</h3>
          <p id="debug">Carregando...</p>
        </div>
        
        <script>
          document.getElementById('debug').innerHTML = 
            'Navegador: ' + navigator.userAgent + '<br>' +
            'Tela: ' + screen.width + 'x' + screen.height + '<br>' +
            'Hora: ' + new Date().toLocaleString();
        </script>
      </body>
    </html>
  `);
}
