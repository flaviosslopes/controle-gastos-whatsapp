const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🔄 Bot que detecta suas próprias mensagens...');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session-self'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

client.on('qr', (qr) => {
    console.log('\n📱 QR CODE (detecta suas mensagens):\n');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ Bot conectado (detecta suas mensagens)!');
});

client.on('message_create', async (message) => {
    console.log('\n📤 MENSAGEM CRIADA:');
    console.log('�� De:', message.from);
    console.log('👤 De mim?', message.fromMe);
    console.log('💬 Texto:', message.body);
    
    const texto = (message.body || '').toLowerCase().trim();
    
    if (texto === 'teste' && !message.fromMe) {
        console.log('�� TESTE DETECTADO!');
        await message.reply('✅ Funcionou!');
    }
});

client.on('message', async (message) => {
    console.log('\n📨 MENSAGEM RECEBIDA:');
    console.log('📱 De:', message.from);
    console.log('💬 Texto:', message.body);
    
    if (!message.from.includes('status')) {
        const texto = (message.body || '').toLowerCase().trim();
        if (texto === 'teste') {
            console.log('�� TESTE FUNCIONOU!');
            await message.reply('✅ Bot funcionando!');
        }
    }
});

client.initialize();
