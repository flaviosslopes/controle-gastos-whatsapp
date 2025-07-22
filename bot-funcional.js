// bot-funcional.js - Versão que resolve o erro de cache
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sqlite3 = require('sqlite3').verbose();

console.log('🔧 Bot funcional - Resolvendo erro de cache...');

// Configuração que resolve o erro
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session-funcional'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
        ]
    },
    // Usar versão específica que funciona
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

// Banco de dados
const db = new sqlite3.Database('gastos.db');
db.run(`
    CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        telefone TEXT,
        valor REAL,
        descricao TEXT,
        categoria TEXT,
        data TEXT,
        hora TEXT
    )
`);

client.on('qr', (qr) => {
    console.log('\n📱 QR CODE (versão funcional):\n');
    qrcode.generate(qr, {small: true});
    console.log('\n✅ Versão que resolve o erro!\n');
});

client.on('ready', () => {
    console.log('✅ Bot funcional conectado!');
    console.log('🎯 Pronto para receber mensagens!');
});

client.on('message', async (message) => {
    console.log('\n📨 MENSAGEM RECEBIDA:');
    console.log('📱 De:', message.from);
    console.log('💬 Texto:', message.body);
    console.log('📂 Tipo:', message.type);
    console.log('👥 É grupo?', message.from.includes('@g.us'));
    console.log('📢 É status?', message.from.includes('status'));
    
    // Ignorar status
    if (message.from.includes('status')) {
        console.log('❌ Ignorando status');
        return;
    }
    
    const texto = (message.body || '').toLowerCase().trim();
    console.log('🔤 Processando:', texto);
    
    try {
        if (texto === 'teste') {
            console.log('✅ TESTE DETECTADO!');
            await message.reply('🎉 SUCESSO! Bot funcional operando!\n\nTeste: "gastei 10 cafe"');
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
            
            db.run(
                'INSERT INTO gastos (telefone, valor, descricao, categoria, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
                [message.from, valor, descricao, categoria, data, hora],
                function(err) {
                    if (err) {
                        console.error('❌ Erro no banco:', err);
                        message.reply('❌ Erro ao salvar');
                    } else {
                        console.log('✅ Gasto salvo! ID:', this.lastID);
                        const resposta = `✅ *Gasto registrado!*\n\n💰 R\$ ${valor.toFixed(2)}\n📝 ${descricao}\n📂 ${categoria}\n📅 ${data} ${hora}`;
                        message.reply(resposta);
                    }
                }
            );
        }
        else if (texto === '/resumo') {
            await enviarResumo(message);
        }
        else if (texto === '/ajuda') {
            const ajuda = `🤖 *Bot de Gastos*\n\n💰 *Como usar:*\n• "gastei 25 almoço"\n• "gasto 50 mercado"\n\n📊 *Comandos:*\n• /resumo\n• teste`;
            await message.reply(ajuda);
        }
        else if (texto) {
            await message.reply('❓ Comandos: "teste", "gastei 10 cafe", "/ajuda"');
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

async function enviarResumo(message) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    db.all(
        'SELECT * FROM gastos WHERE telefone = ? AND data = ?',
        [message.from, hoje],
        (err, rows) => {
            if (err || rows.length === 0) {
                message.reply('📊 Nenhum gasto hoje!');
                return;
            }
            
            let total = 0;
            let resumo = `📊 *Resumo de hoje:*\n\n`;
            
            rows.forEach(gasto => {
                resumo += `${gasto.categoria} R\$ ${gasto.valor.toFixed(2)} - ${gasto.descricao}\n`;
                total += gasto.valor;
            });
            
            resumo += `\n💰 *Total: R\$ ${total.toFixed(2)}*`;
            message.reply(resumo);
        }
    );
}

console.log('🚀 Inicializando bot funcional...');
client.initialize();
