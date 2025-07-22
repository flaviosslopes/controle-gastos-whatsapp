const wppconnect = require('@wppconnect-team/wppconnect');

console.log('�� Bot Corrigido - Iniciando...');

wppconnect
  .create({
    session: 'controle-gastos-v2',
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log('\n📱 QR CODE:\n');
      console.log(asciiQR);
      console.log('\n✅ Escaneie novamente!\n');
    },
    statusFind: (statusSession, session) => {
      console.log('📊 Status:', statusSession);
    },
    headless: false,
    debug: false,
    logQR: true
  })
  .then((client) => {
    console.log('🎉 BOT CONECTADO!');
    console.log('📱 Aguardando mensagens...');
    
    client.onMessage(async (message) => {
      console.log('\n🔍 NOVA MENSAGEM:');
      console.log('📱 De:', message.from);
      console.log('💬 Texto:', message.body || '[vazio]');
      
      if (message.from === 'status@broadcast') {
        console.log('❌ Ignorando status');
        return;
      }
      
      const texto = (message.body || '').toLowerCase().trim();
      console.log('🔤 Processando:', texto);
      
      if (texto === 'teste') {
        console.log('🎉 TESTE DETECTADO!');
        await client.sendText(message.from, '✅ Bot funcionando! 🚀');
        console.log('✅ Resposta enviada!');
      }
      else if (texto.includes('gastei')) {
        console.log('💰 GASTO DETECTADO!');
        await client.sendText(message.from, '💰 Gasto registrado com sucesso!');
      }
    });
  })
  .catch((error) => {
    console.error('❌ Erro:', error);
  });
