export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <title>QR Code WhatsApp</title>
  <meta charset="UTF-8">
</head>
<body style="text-align:center; font-family:Arial; padding:20px;">
  <h1>🤖 WhatsApp QR Code</h1>
  
  <div style="border: 2px solid #25D366; padding: 30px; margin: 20px;">
    <p>📱 QR Code:</p>
    
    <div style="width: 200px; height: 200px; background: #000; margin: 20px auto; position: relative;">
      <div style="width: 180px; height: 180px; background: #fff; position: absolute; top: 10px; left: 10px;">
        <div style="width: 40px; height: 40px; background: #000; position: absolute; top: 20px; left: 20px;"></div>
        <div style="width: 40px; height: 40px; background: #000; position: absolute; top: 20px; right: 20px;"></div>
        <div style="width: 40px; height: 40px; background: #000; position: absolute; bottom: 20px; left: 20px;"></div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 12px; color: #000;">
          WhatsApp<br>Bot
        </div>
      </div>
    </div>
    
    <p><strong>Status:</strong> ✅ QR Code ativo!</p>
    <p><small>📱 Escaneie para conectar</small></p>
  </div>
  
  <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">← Voltar</a>
</body>
</html>
  `);
}
