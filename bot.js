// bot.js - Controle de Gastos WhatsApp
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sqlite3 = require('sqlite3').verbose();

console.log('🍎 Iniciando bot para Mac...');

// Criar banco de dados
const db = new sqlite3.Database('gastos.db');

// Criar tabela
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

// Configurar WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './whatsapp-session'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
});

// Mostrar QR Code
client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE ESTE QR CODE COM SEU WHATSAPP:\n');
    qrcode.generate(qr, {small: true});
    console.log('\n👆 Abra WhatsApp > Dispositivos Conectados > Conectar Dispositivo\n');
});

// Quando conectar
client.on('ready', () => {
    console.log('✅ Bot conectado com sucesso!');
    console.log('💬 Envie mensagens como: "Gastei 25 no almoço"');
    console.log('📊 Para resumo, envie: /resumo');
});

// Quando receber mensagem
client.on('message', async (message) => {
    // Ignorar grupos e status
    if (message.from.includes('@g.us') || message.from.includes('status')) {
        return;
    }
    
    const texto = message.body.toLowerCase().trim();
    const telefone = message.from;
    
    console.log(`📨 Mensagem recebida: ${texto}`);
    
    try {
        // Processar gastos
        if (texto.includes('gastei') || texto.includes('gasto')) {
            await processarGasto(texto, telefone, message);
        }
        
        // Comandos
        else if (texto === '/resumo' || texto === 'resumo') {
            await enviarResumo(telefone, message);
        }
        
        else if (texto === '/mes' || texto === 'mes') {
            await enviarResumoMes(telefone, message);
        }
        
        else if (texto === '/ajuda' || texto === 'ajuda') {
            await enviarAjuda(message);
        }
        
        else if (texto === '/total' || texto === 'total') {
            await enviarTotal(telefone, message);
        }
        
    } catch (error) {
        console.error('❌ Erro:', error);
        message.reply('❌ Ops! Algo deu errado. Tente novamente.');
    }
});

// Função para processar gastos
async function processarGasto(texto, telefone, message) {
    console.log('💰 Processando gasto...');
    
    // Extrair valor
    const valorMatch = texto.match(/(\d+(?:[.,]\d{1,2})?)/);
    
    if (!valorMatch) {
        await message.reply('❌ Não encontrei o valor. Tente: "Gastei 25 no almoço"');
        return;
    }
    
    const valor = parseFloat(valorMatch[1].replace(',', '.'));
    
    // Extrair descrição
    let descricao = texto
        .replace(/gastei|gasto|r\$|\d+(?:[.,]\d{1,2})?|reais?|no|na|em|com/g, '')
        .trim();
    
    if (!descricao) {
        descricao = 'Gasto não especificado';
    }
    
    // Categorizar
    const categoria = categorizarGasto(descricao);
    
    const agora = new Date();
    const data = agora.toLocaleDateString('pt-BR');
    const hora = agora.toLocaleTimeString('pt-BR');
    
    // Salvar no banco
    db.run(
        'INSERT INTO gastos (telefone, valor, descricao, categoria, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
        [telefone, valor, descricao, categoria, data, hora],
        function(err) {
            if (err) {
                console.error('❌ Erro no banco:', err);
                message.reply('❌ Erro ao salvar. Tente novamente.');
            } else {
                console.log('✅ Gasto salvo com ID:', this.lastID);
                
                const resposta = `✅ *Gasto registrado!*

💰 *Valor:* R\$ ${valor.toFixed(2)}
📝 *Descrição:* ${descricao}
📂 *Categoria:* ${categoria}
📅 *Data:* ${data} às ${hora}

_ID: #${this.lastID}_`;
                
                message.reply(resposta);
            }
        }
    );
}

// Função para categorizar gastos
function categorizarGasto(descricao) {
    const desc = descricao.toLowerCase();
    
    if (desc.includes('almoço') || desc.includes('jantar') || desc.includes('café') || 
        desc.includes('lanche') || desc.includes('restaurante') || desc.includes('comida')) {
        return '🍽️ Alimentação';
    }
    
    if (desc.includes('uber') || desc.includes('taxi') || desc.includes('ônibus') || 
        desc.includes('metro') || desc.includes('gasolina') || desc.includes('combustível')) {
        return '🚗 Transporte';
    }
    
    if (desc.includes('supermercado') || desc.includes('mercado') || desc.includes('compras')) {
        return '🛒 Compras';
    }
    
    if (desc.includes('farmácia') || desc.includes('médico') || desc.includes('remédio')) {
        return '💊 Saúde';
    }
    
    if (desc.includes('cinema') || desc.includes('show') || desc.includes('festa') || 
        desc.includes('bar') || desc.includes('diversão')) {
        return '🎉 Lazer';
    }
    
    return '📦 Outros';
}

// Função para resumo do dia
async function enviarResumo(telefone, message) {
    const hoje = new Date().toLocaleDateString('pt-BR');
    
    db.all(
        'SELECT * FROM gastos WHERE telefone = ? AND data = ? ORDER BY hora DESC',
        [telefone, hoje],
        (err, rows) => {
            if (err) {
                message.reply('❌ Erro ao buscar gastos');
                return;
            }
            
            if (rows.length === 0) {
                message.reply('📊 *Resumo do dia*\n\n🎉 Nenhum gasto registrado hoje!\nParabéns! 👏');
                return;
            }
            
            let total = 0;
            let resumo = `📊 *Resumo de hoje (${hoje})*\n\n`;
            
            rows.forEach((gasto, index) => {
                resumo += `${index + 1}. ${gasto.categoria} R\$ ${gasto.valor.toFixed(2)}\n   📝 ${gasto.descricao}\n   🕐 ${gasto.hora}\n\n`;
                total += gasto.valor;
            });
            
            resumo += `💰 *Total do dia: R\$ ${total.toFixed(2)}*\n`;
            resumo += `🔢 *${rows.length} gasto(s) registrado(s)*`;
            
            message.reply(resumo);
        }
    );
}

// Função para resumo do mês
async function enviarResumoMes(telefone, message) {
    const agora = new Date();
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();
    
    db.all(
        `SELECT categoria, SUM(valor) as total, COUNT(*) as quantidade 
         FROM gastos 
         WHERE telefone = ? AND data LIKE '%/${mes}/${ano}' 
         GROUP BY categoria 
         ORDER BY total DESC`,
        [telefone],
        (err, rows) => {
            if (err || rows.length === 0) {
                message.reply('📊 *Resumo do mês*\n\n🎉 Nenhum gasto registrado este mês!');
                return;
            }
            
            let totalGeral = 0;
            let resumo = `📊 *Resumo de ${mes}/${ano}*\n\n`;
            
            rows.forEach(categoria => {
                resumo += `${categoria.categoria}: R\$ ${categoria.total.toFixed(2)} (${categoria.quantidade}x)\n`;
                totalGeral += categoria.total;
            });
            
            resumo += `\n💰 *Total do mês: R\$ ${totalGeral.toFixed(2)}*`;
            
            message.reply(resumo);
        }
    );
}

// Função para total geral
async function enviarTotal(telefone, message) {
    db.get(
        'SELECT SUM(valor) as total, COUNT(*) as quantidade FROM gastos WHERE telefone = ?',
        [telefone],
        (err, row) => {
            if (err || !row.total) {
                message.reply('📊 *Total Geral*\n\n🎉 Nenhum gasto registrado ainda!');
                return;
            }
            
            const resposta = `📊 *Total Geral*\n\n💰 *R\$ ${row.total.toFixed(2)}*\n🔢 *${row.quantidade} gastos registrados*`;
            message.reply(resposta);
        }
    );
}

// Função de ajuda
async function enviarAjuda(message) {
    const ajuda = `🤖 *Como usar o bot:*

💰 *Registrar gastos:*
• "Gastei 25 no almoço"
• "Gasto 50 supermercado"
• "Gastei 15,50 no café"

📊 *Comandos:*
• /resumo - Gastos de hoje
• /mes - Resumo do mês
• /total - Total geral
• /ajuda - Esta mensagem

🏷️ *Categorias automáticas:*
🍽️ Alimentação | 🚗 Transporte
🛒 Compras | 💊 Saúde
🎉 Lazer | 📦 Outros

_Desenvolvido com ❤️_`;
    
    message.reply(ajuda);
}

// Inicializar
console.log('🚀 Iniciando cliente WhatsApp...');
client.initialize();
