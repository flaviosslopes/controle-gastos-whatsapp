const wppconnect = require('@wppconnect-team/wppconnect');

console.log('🤖 Bot Controle de Gastos - Render');
console.log('🚀 Iniciando na nuvem gratuita...');

const PORT = process.env.PORT || 3000;

// Servidor HTTP simples para manter vivo
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('🤖 Bot WhatsApp funcionando!\n⏰ ' + new Date().toLocaleString('pt-BR'));
});

server.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});

wppconnect
  .create({
    session: 'controle-gastos-render',
    headless: true,
    debug: false,
    logQR: true,
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding'
    ]
  })
  .then((client) => {
    console.log('🎉 BOT CONECTADO NO RENDER!');
    console.log('📱 Aguardando mensagens...');
    
    client.onAnyMessage(async (message) => {
      if (message.fromMe && message.body) {
        console.log('📤 Nova mensagem:', message.body);
        
        const texto = message.body.toLowerCase().trim();
        
        try {
          if (texto === 'teste') {
            console.log('🎉 TESTE DETECTADO!');
            await client.sendText(message.to, '✅ Bot no Render funcionando! 🆓☁️\n\n🚀 Totalmente gratuito!\n⏰ 24/7 online!');
            console.log('✅ Resposta de teste enviada!');
          }
          else if (texto.includes('gastei')) {
            console.log('💰 GASTO DETECTADO!');
            
            const valorMatch = texto.match(/(\d+(?:[.,]\d{1,2})?)/);
            if (valorMatch) {
              const valor = parseFloat(valorMatch[1].replace(',', '.'));
              let descricao = texto.replace(/gastei|gasto|r\$|\d+(?:[.,]\d{1,2})?|reais?/g, '').trim();
              
              if (!descricao) descricao = 'Gasto não especificado';
              
              const categoria = categorizarGasto(descricao);
              const agora = new Date();
              const data = agora.toLocaleDateString('pt-BR');
              const hora = agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
              
              const resposta = `✅ *Gasto registrado!* 💰\n\n💵 R\$ ${valor.toFixed(2)}\n📝 ${descricao}\n📂 ${categoria}\n📅 ${data} às ${hora}\n\n🆓 Render gratuito funcionando!`;
              
              await client.sendText(message.to, resposta);
              console.log('✅ Gasto registrado:', valor, '-', descricao);
            } else {
              await client.sendText(message.to, '❌ Formato incorreto!\n\n✅ Use: "gastei 25 almoço"');
            }
          }
          else if (texto === 'status') {
            const uptime = process.uptime();
            const horas = Math.floor(uptime / 3600);
            const minutos = Math.floor((uptime % 3600) / 60);
            
            await client.sendText(message.to, `🤖 *Status do Bot*\n\n✅ Online no Render\n🆓 Totalmente gratuito\n⏰ Ativo há ${horas}h ${minutos}m\n📱 Pronto para registrar gastos!`);
          }
        } catch (error) {
          console.error('❌ Erro:', error);
        }
      }
    });
    
    // Manter bot ativo
    setInterval(() => {
      console.log('💓 Bot ativo:', new Date().toLocaleString('pt-BR'));
    }, 300000); // 5 minutos
    
  })
  .catch((error) => {
    console.error('❌ Erro na conexão:', error);
    setTimeout(() => {
      console.log('🔄 Tentando reconectar...');
      process.exit(1);
    }, 5000);
  });

function categorizarGasto(descricao) {
  const desc = descricao.toLowerCase();
  if (desc.includes('almoço') || desc.includes('café') || desc.includes('jantar') || desc.includes('lanche') || desc.includes('comida')) return '🍽️ Alimentação';
  if (desc.includes('uber') || desc.includes('taxi') || desc.includes('ônibus') || desc.includes('metro') || desc.includes('gasolina')) return '🚗 Transporte';
  if (desc.includes('mercado') || desc.includes('supermercado') || desc.includes('compras')) return '🛒 Compras';
  if (desc.includes('farmácia') || desc.includes('remédio') || desc.includes('médico') || desc.includes('hospital')) return '🏥 Saúde';
  if (desc.includes('cinema') || desc.includes('show') || desc.includes('festa') || desc.includes('bar')) return '🎬 Entretenimento';
  return '📦 Outros';
}
