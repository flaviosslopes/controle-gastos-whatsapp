export default (req, res) => {
  const pathname = req.url || "/";
  
  if (pathname === "/qr") {
    res.send(`<html><body style="text-align:center; padding:20px;">
      <h1>WhatsApp QR Code</h1>
      <div style="border:2px dashed #25D366; padding:30px; margin:20px;">
        <h2>QR Code aqui</h2>
        <p>Status: Funcionando!</p>
      </div>
      <a href="/">Voltar</a>
    </body></html>`);
    return;
  }
  
  res.send(`<html><body style="text-align:center; padding:20px;">
    <h1>Bot WhatsApp</h1>
    <p>Servidor funcionando!</p>
    <a href="/qr" style="background:#25D366; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Ver QR Code</a>
  </body></html>`);
};
