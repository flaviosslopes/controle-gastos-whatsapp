const wppconnect = require('@wppconnect-team/wppconnect');

console.log('🔗 Iniciando WPPConnect...');

wppconnect
  .create({
    session: 'controle-gastos',
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log('\n📱 QR CODE (escaneie com WhatsApp):\n');
      console.log(asciiQR);
      console.log('\n✅ Escaneie o código acima!\n');
    },
    statusFind: (statusSession, session) => {
      console.log('📊 Status:', statusSession);
      if (statusSession === 'qrReadSuccess') {
        console.log('✅ QR Code lido com sucesso!');
      }
    },
    headless: false,
    devtools: false,
    useChrome: true,
    debug: false,
    logQR: true,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
    autoClose: 60000,
    puppeteerOptions: {
      userDataDir: './session-data',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  })
  .then((client) => {
    console.log('🎉 CONECTADO COM SUCESSO!');
    console.log('📱 Bot pronto para receber mensagens!');
    
    client.onMessage(async (message) => {
      console.log('\n📨 NOVA MENSAGEM:');
      console.log('📱 De:', message.from);
      console.log('💬 Texto:', message.body);
      
      if (message.isGroupMsg || message.from === 'status@broadcast') {
        return;
      }
      
      const texto = message.body.toLowerCase().trim();
      
      try {
        if (texto === 'teste') {
          console.log('🎉 TESTE DETECTADO!');
          await client.sendText(message.from, '✅ Bot WPPConnect funcionando! 🚀');
        }
        else if (texto.includes('gastei') || texto.includes('gasto')) {
          console.log('💰 PROCESSANDO GASTO...');
          
          const valorMatch = texto.match(/(\d+(?:[.,]\d{1,2})?)/);
          if (!valorMatch) {
            await client.sendText(message.from, '❌ Valor não encontrado!\n\n📝 Exemplo: "gastei 25 almoço"');
            return;
          }
          
          const valor = parseFloat(valorMatch[1].replace(',', '.'));
          
          let descricao = texto
            .replace(/gastei|gasto|r\$|\d+(?:[.,]\d{1,2})?|reais?|no|na|em|com/g, '')
            .trim();
          
          if (!descricao) descricao = 'Gasto não especificado';
          
          const categoria = categorizarGasto(descricao);
          
          const agora = new Date();
          const data = agora.toLocaleDateString('pt-BR');
          const hora = agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
          
          const resposta = `✅ *Gasto registrado!*\n\n💰 *Valor:* R\$ ${valor.toFixed(2)}\n📝 *Descrição:* ${descricao}\n📂 *Categoria:* ${categoria}\n📅 *Data:* ${data} às ${hora}`;
          
          await client.sendText(message.from, resposta);
          console.log('✅ Gasto registrado:', valor, descricao, categoria);
        }
        else if (texto === '/ajuda' || texto === 'ajuda') {
          const ajuda = `🤖 *Bot de Controle de Gastos*\n\n💰 *Como usar:*\n• "gastei 25 almoço"\n• "gasto 50 mercado"\n\n📊 *Comandos:*\n• teste\n• /ajuda`;
          await client.sendText(message.from, ajuda);
        }
      } catch (error) {
        console.error('❌ Erro:', error);
      }
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar:', error);
  });

function categorizarGasto(descricao) {
  const desc = descricao.toLowerCase();
  
  if (desc.includes('almoço') || desc.includes('almoco') || 
      desc.includes('jantar') || desc.includes('café') || 
      desc.includes('cafe') || desc.includes('lanche')) {
    return '🍽️ Alimentação';
  }
  
  if (desc.includes('uber') || desc.includes('taxi') || 
      desc.includes('gasolina') || desc.includes('transporte')) {
    return '🚗 Transporte';
  }
  
  if (desc.includes('supermercado') || desc.includes('mercado')) {
    return '🛒 Compras';
  }
  
  return '📦 Outros';
}
