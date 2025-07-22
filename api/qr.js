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
          
          <!-- QR Code como SVG direto -->
          <div style="background: white; padding: 20px; display: inline-block; border: 2px solid #000;">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="white"/>
              <rect x="10" y="10" width="20" height="20" fill="black"/>
              <rect x="40" y="10" width="20" height="20" fill="black"/>
              <rect x="70" y="10" width="20" height="20" fill="black"/>
              <rect x="10" y="40" width="20" height="20" fill="black"/>
              <rect x="70" y="40" width="20" height="20" fill="black"/>
              <rect x="10" y="70" width="20" height="20" fill="black"/>
              <rect x="40" y="70" width="20" height="20" fill="black"/>
              <rect x="70" y="70" width="20" height="20" fill="black"/>
              
              <rect x="130" y="10" width="20" height="20" fill="black"/>
              <rect x="160" y="10" width="20" height="20" fill="black"/>
              <rect x="130" y="40" width="20" height="20" fill="black"/>
              <rect x="160" y="40" width="20" height="20" fill="black"/>
              <rect x="130" y="70" width="20" height="20" fill="black"/>
              <rect x="160" y="70" width="20" height="20" fill="black"/>
              
              <rect x="10" y="130" width="20" height="20" fill="black"/>
              <rect x="40" y="130" width="20" height="20" fill="black"/>
              <rect x="70" y="130" width="20" height="20" fill="black"/>
              <rect x="10" y="160" width="20" height="20" fill="black"/>
              <rect x="70" y="160" width="20" height="20" fill="black"/>
              
              <text x="100" y="110" text-anchor="middle" font-family="Arial" font-size="12" fill="black">WhatsApp Bot</text>
            </svg>
          </div>
          
          <p><strong>Status:</strong> QR Code carregado!</p>
          <p><small>📱 Escaneie com WhatsApp</small></p>
        </div>
        <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none;">← Voltar</a>
        
        <script>
          console.log('QR Code page loaded');
          // Teste se imagens externas funcionam
          const testImg = new Image();
          testImg.onload = function() {
            console.log('Imagens externas funcionam!');
          };
          testImg.onerror = function() {
            console.log('Imagens externas bloqueadas!');
          };
          testImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=test';
        </script>
      </body>
    </html>
  `);
}
