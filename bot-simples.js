const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🔧 Bot ultra-simples iniciando...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: ['--no-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE O QR CODE:\n');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ CONECTADO!');
});

client.on('message', async (message) => {
    console.log('\n📨 MENSAGEM:', message.body);
    console.log('📱 DE:', message.from);
    
    if (message.body === 'teste') {
        console.log('🎉 TESTE DETECTADO!');
        await message.reply('✅ Funcionando!');
    }
});

client.initialize();
