export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <title>QR Code WhatsApp</title>
  <meta charset="UTF-8">
</head>
<body style="text-align:center; font-family:Arial; padding:20px;">
  <h1>🤖 WhatsApp QR Code</h1>
  
  <div style="border: 2px solid #25D366; padding: 30px; margin: 20px;">
    <p>📱 QR Code:</p>
    
    <div style="background: white; padding: 20px; display: inline-block;">
      <div style="width: 200px; height: 200px; background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI0MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI3MCIgeT0iMTAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSIxMCIgeT0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI3MCIgeT0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSIxMCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI0MCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8cmVjdCB4PSI3MCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KICA8dGV4dCB4PSIxMDAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJibGFjayI+V2hhdHNBcHAgQm90PC90ZXh0Pgo8L3N2Zz4K'); background-size: contain; background-repeat: no-repeat;"></div>
    </div>
    
    <p><strong>Status:</strong> ✅ QR Code gerado!</p>
    <p><small>📱 Escaneie com WhatsApp</small></p>
  </div>
  
  <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">← Voltar</a>
</body>
</html>`);
}
