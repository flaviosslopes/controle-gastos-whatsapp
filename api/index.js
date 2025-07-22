export default function handler(req, res) {
  const pathname = req.url || '/';
  
  if (pathname === '/qr') {
    res.status(200).send(`
      <html>
        <head><title>QR Code WhatsApp</title></head>
        <body style="text-align:center; padding:20px; font-family:Arial;">
          <h1>WhatsApp QR Code</h1>
          <div style="border:2px solid green; padding:30px; margin:20px;">
            <h2>QR Code Funcionando!</h2>
            <p>Status: OK</p>
          </div>
          <a href="/">Voltar</a>
        </body>
      </html>
    `);
    return;
  }
  
  res.status(200).send(`
    <html>
      <head><title>Bot WhatsApp</title></head>
      <body style="text-align:center; padding:20px; font-family:Arial;">
        <h1>Bot WhatsApp</h1>
        <p>Servidor funcionando perfeitamente!</p>
        <a href="/qr" style="background:green; color:white; padding:10px 20px; text-decoration:none;">Ver QR Code</a>
      </body>
    </html>
  `);
}
