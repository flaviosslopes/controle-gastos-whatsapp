export default function handler(req, res) {
  const url = req.url || '/';
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  if (url === '/qr' || url.startsWith('/qr')) {
    return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <title>QR Code WhatsApp</title>
  <meta charset="UTF-8">
</head>
<body style="text-align:center; font-family:Arial; padding:20px;">
  <h1>WhatsApp QR Code</h1>
  <div style="border: 2px solid #25D366; padding: 30px; margin: 20px;">
    <p>QR Code:</p>
    <div style="width: 200px; height: 200px; background: #000; margin: 20px auto; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; border-radius: 10px;">
      WHATSAPP<br>QR CODE
    </div>
    <p><strong>Status:</strong> Funcionando!</p>
    <p><small>Escaneie para conectar</small></p>
  </div>
  <a href="/" style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Voltar</a>
</body>
</html>`);
  }
  
  return res.status(200).send(`<!DOCTYPE html>
<html>
<head>
  <title>Bot WhatsApp</title>
  <meta charset="UTF-8">
</head>
<body style="text-align:center; font-family:Arial; padding:20px;">
  <h1>Bot WhatsApp - Controle de Gastos</h1>
  <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px;">
    <p><strong>Servidor funcionando!</strong></p>
    <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
    <p>Bot para controle de gastos via WhatsApp</p>
  </div>
  <a href="/qr" style="background: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px;">
    Ver QR Code
  </a>
</body>
</html>`);
}
