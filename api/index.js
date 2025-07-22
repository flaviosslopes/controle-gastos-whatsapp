export default function handler(req, res) {
  const pathname = req.url || '/';
  
  if (pathname === '/qr') {
    res.status(200).send(`
      <html>
        <head><title>QR Code WhatsApp</title></head>
        <body style="text-align:center; padding:20px; font-family:Arial;">
          <h1>WhatsApp QR Code</h1>
          <div style="border:2px dashed #25D366; padding:30px; margin:20px;">
            <h2>QR Code aqui</h2>
            <p>Status: Funcionando!</p>
          </div>
          <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
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
        <p>Servidor funcionando!</p>
        <p>Hora: ${new Date().toLocaleString('pt-BR')}</p>
        <a href="/qr" style="background:#25D366; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Ver QR Code</a>
      </body>
    </html>
  `);
}
