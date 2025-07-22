const wppconnect = require('@wppconnect-team/wppconnect');

console.log('🔍 Bot DEBUG - SEM FILTROS');

wppconnect
  .create({
    session: 'debug-session',
    headless: false,
    debug: false
  })
  .then((client) => {
    console.log('🎉 CONECTADO!');
    
    // CAPTURAR TUDO
    client.onMessage(async (message) => {
      console.log('\n📨 QUALQUER MENSAGEM:');
      console.log('�� De:', message.from);
      console.log('�� Texto:', message.body);
      console.log('📂 Tipo:', message.type);
      console.log('👤 É minha?', message.fromMe);
      console.log('👥 Grupo?', message.isGroupMsg);
      console.log('---');
      
      // SEM FILTROS - responder a TUDO
      if (message.body && message.body.toLowerCase() === 'teste') {
        await client.sendText(message.from, '✅ FUNCIONOU!');
      }
    });
    
    // Capturar suas próprias mensagens
    client.onAnyMessage(async (message) => {
      if (message.fromMe) {
        console.log('\n📤 SUA MENSAGEM:', message.body);
      }
    });
    
  });
