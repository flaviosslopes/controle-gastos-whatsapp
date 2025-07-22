const wppconnect = require('@wppconnect-team/wppconnect');

console.log('🤖 Bot Final - Suas Mensagens');

wppconnect
  .create({
    session: 'bot-final',
    headless: false,
    debug: false
  })
  .then((client) => {
    console.log('�� BOT CONECTADO!');
    console.log('�� Envie mensagens para VOCÊ MESMO!');
    
    // Capturar SUAS mensagens
    client.onAnyMessage(async (message) => {
      if (message.fromMe && message.body) {
        console.log('\n📤 SUA MENSAGEM:', message.body);
        
        const texto = message.body.toLowerCase().trim();
        
        if (texto === 'teste') {
          console.log('🎉 TESTE DETECTADO!');
          // Responder para você mesmo
          await client.sendText(message.to, '✅ Bot funcionando perfeitamente! 🚀');
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
            
            const resposta = `✅ *Gasto registrado!*\n\n💰 R\$ ${valor.toFixed(2)}\n📝 ${descricao}\n📂 ${categoria}\n📅 ${data} ${hora}`;
            
            await client.sendText(message.to, resposta);
            console.log('✅ Gasto registrado:', valor, descricao);
          }
        }
      }
    });
  });

function categorizarGasto(descricao) {
  const desc = descricao.toLowerCase();
  if (desc.includes('almoço') || desc.includes('café')) return '🍽️ Alimentação';
  if (desc.includes('uber') || desc.includes('taxi')) return '🚗 Transporte';
  if (desc.includes('mercado')) return '🛒 Compras';
  return '📦 Outros';
}
