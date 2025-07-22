const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🍎 Bot otimizado para Mac...');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session-mac'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor'
        ],
        timeout: 60000,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

client.on('qr', (qr) => {
    console.log('\n📱 QR CODE (Mac otimizado):\n');
    qrcode.generate(qr, {small: true});
    console.log('\n✅ Escaneie com WhatsApp!\n');
});

client.on('ready', () => {
    console.log('✅ Bot Mac conectado!');
    console.log('📱 Pronto para receber mensagens!');
});

client.on('message', async (message) => {
    console.log('\n📨 MENSAGEM RECEBIDA:');
    console.log('📱 De:', message.from);
    console.log('💬 Texto:', message.body);
    console.log('📂 Tipo:', message.type);
    
    if (message.from.includes('status')) {
        console.log('❌ Ignorando status');
        return;
    }
    
    const texto = (message.body || '').toLowerCase().trim();
    console.log('🔤 Processando:', texto);
    
    try {
        if (texto === 'teste') {
            console.log('🎉 TESTE DETECTADO!');
            await message.reply('✅ Bot Mac funcionando! 🍎');
        }
        else if (texto.includes('gastei') || texto.includes('gasto')) {
            console.log('💰 Processando gasto...');
            
            const valorMatch = texto.match(/(\d+(?:[.,]\d{1,2})?)/);
            if (!valorMatch) {
                await message.reply('❌ Valor não encontrado. Exemplo: "gastei 25 almoço"');
                return;
            }
            
            const valor = parseFloat(valorMatch[1].replace(',', '.'));
            let descricao = texto.replace(/gastei|gasto|r\$|\d+(?:[.,]\d{1,2})?|reais?|no|na|em|com/g, '').trim();
            
            if (!descricao) descricao = 'Gasto não especificado';
            
            const categoria = categorizarGasto(descricao);
            const agora = new Date();
            const data = agora.toLocaleDateString('pt-BR');
            const hora = agora.toLocaleTimeString('pt-BR');
            
            const resposta = `✅ *Gasto registrado!*\n\n💰 R\$ ${valor.toFixed(2)}\n📝 ${descricao}\n📂 ${categoria}\n📅 ${data} ${hora}`;
            await message.reply(resposta);
        }
        else if (texto === '/ajuda') {
            const ajuda = `🤖 *Bot de Gastos Mac*\n\n💰 *Como usar:*\n• "gastei 25 almoço"\n• "gasto 50 mercado"\n\n📊 *Comandos:*\n• teste\n• /ajuda`;
            await message.reply(ajuda);
        }
    } catch (error) {
        console.error('❌ Erro:', error);
    }
});

function categorizarGasto(descricao) {
    const desc = descricao.toLowerCase();
    if (desc.includes('almoço') || desc.includes('jantar') || desc.includes('café') || desc.includes('cafe')) return '🍽️ Alimentação';
    if (desc.includes('uber') || desc.includes('taxi') || desc.includes('gasolina')) return '🚗 Transporte';
    if (desc.includes('supermercado') || desc.includes('mercado')) return '🛒 Compras';
    return '📦 Outros';
}

console.log('🚀 Inicializando bot Mac...');
client.initialize();
