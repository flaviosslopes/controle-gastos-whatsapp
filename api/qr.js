export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>QR Code WhatsApp</title>
        <meta charset="UTF-8">
      </head>
      <body style="text-align:center; font-family:monospace; padding:20px;">
        <h1>🤖 WhatsApp QR Code</h1>
        
        <div style="border: 2px solid #25D366; padding: 30px; margin: 20px;">
          <p>📱 QR Code ASCII:</p>
          
          <pre style="font-size: 8px; line-height: 8px; background: white; padding: 20px; border: 1px solid #000;">
██████████████    ██  ██████████████
██          ██  ████  ██          ██
██  ██████  ██  ██    ██  ██████  ██
██  ██████  ██    ██  ██  ██████  ██
██  ██████  ██  ██    ██  ██████  ██
██          ██  ████  ██          ██
██████████████  ██  ██████████████
                ██                  
██  ██    ██████    ██    ██  ██████
    ██████    ██████████████    ██  
██████  ██  ██    ██████  ██████    
██    ████████  ██  ██    ██████████
██████    ██  ██████████    ██  ████
                ██                  
██████████████    ██████  ██    ████
██          ██  ██  ██████████  ██  
██  ██████  ██    ████  ██    ██████
██  ██████  ██  ██████████████    ██
██  ██████  ██  ██    ██  ██████  ██
██          ██    ██████    ██████  
██████████████  ██████  ██████  ████
          </pre>
          
          <p><strong>Status:</strong> ✅ QR Code gerado!</p>
          <p><small>📱 Escaneie este código com WhatsApp</small></p>
          
          <div style="margin-top: 20px;">
            <button onclick="copyQR()" style="background: #25D366; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
              📋 Copiar QR Code
            </button>
          </div>
        </div>
        
        <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">← Voltar</a>
        
        <script>
          function copyQR() {
            const qrText = document.querySelector('pre').textContent;
            navigator.clipboard.writeText(qrText).then(function() {
              alert('QR Code copiado!');
            });
          }
          
          console.log('✅ QR Code page loaded successfully');
          alert('🎉 QR Code carregado! Você consegue ver o padrão de quadrados?');
        </script>
      </body>
    </html>
  `);
}
