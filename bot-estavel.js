const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('✅ Bot versão estável iniciando...');

const client = new Client({
    puppeteer: {
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE O QR CODE:\n');
    qrcode.generate(qr, {small: true});
    console.log('\n✅ Escaneie com seu WhatsApp!\n');
});

client.on('ready', () => {
    console.log('🎉 BOT CONECTADO COM SUCESSO!');
    console.log('📱 Pronto para receber mensagens!');
});

client.on('message', async (message) => {
    console.log('\n📨 NOVA MENSAGEM:');
    console.log('�� De:', message.from);
    console.log('💬 Texto:', message.body);
    
    // Ignorar status do WhatsApp
    if (message.from === 'status@broadcast') {
        return;
    }
    
    const texto = message.body.toLowerCase().trim();
    
    try {
        if (texto === 'teste') {
            console.log('🎉 COMANDO TESTE DETECTADO!');
            await message.reply('✅ Bot funcionando perfeitamente! 🚀');
        }
        else if (texto.includes('gastei') || texto.includes('gasto')) {
            console.log('💰 PROCESSANDO GASTO...');
            
            // Extrair valor
            const valorMatch = texto.match(/(\d+(?:[.,]\d{1,2})?)/);
            if (!valorMatch) {
                await message.reply('❌ Valor não encontrado!\n\n📝 Exemplo: "gastei 25 almoço"');
                return;
            }
            
            const valor = parseFloat(valorMatch[1].replace(',', '.'));
            
            // Extrair descrição
            let descricao = texto
                .replace(/gastei|gasto|r\$|\d+(?:[.,]\d{1,2})?|reais?|no|na|em|com/g, '')
                .trim();
            
            if (!descricao) descricao = 'Gasto não especificado';
            
            // Categorizar
            const categoria = categorizarGasto(descricao);
            
            // Data e hora
            const agora = new Date();
            const data = agora.toLocaleDateString('pt-BR');
            const hora = agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
            
            const resposta = `✅ *Gasto registrado com sucesso!*\n\n💰 *Valor:* R\$ ${valor.toFixed(2)}\n📝 *Descrição:* ${descricao}\n📂 *Categoria:* ${categoria}\n📅 *Data:* ${data} às ${hora}`;
            
            await message.reply(resposta);
            console.log('✅ Gasto registrado:', valor, descricao, categoria);
        }
        else if (texto === '/ajuda' || texto === 'ajuda') {
            const ajuda = `🤖 *Bot de Controle de Gastos*\n\n💰 *Como registrar gastos:*\n• "gastei 25 almoço"\n• "gasto 50 supermercado"\n• "gastei 15.50 café"\n\n📊 *Comandos disponíveis:*\n• teste - Verificar se bot está funcionando\n• /ajuda - Mostrar esta mensagem\n\n📂 *Categorias automáticas:*\n🍽️ Alimentação\n🚗 Transporte\n🛒 Compras\n📦 Outros`;
            await message.reply(ajuda);
        }
    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
        await message.reply('❌ Erro interno. Tente novamente.');
    }
});

function categorizarGasto(descricao) {
    const desc = descricao.toLowerCase();
    
    // Alimentação
    if (desc.includes('almoço') || desc.includes('almoco') || 
        desc.includes('jantar') || desc.includes('café') || 
        desc.includes('cafe') || desc.includes('lanche') ||
        desc.includes('restaurante') || desc.includes('comida')) {
        return '🍽️ Alimentação';
    }
    
    // Transporte
    if (desc.includes('uber') || desc.includes('taxi') || 
        desc.includes('gasolina') || desc.includes('onibus') ||
        desc.includes('metro') || desc.includes('transporte')) {
        return '🚗 Transporte';
    }
    
    // Compras
    if (desc.includes('supermercado') || desc.includes('mercado') ||
        desc.includes('farmacia') || desc.includes('loja')) {
        return '🛒 Compras';
    }
    
    return '📦 Outros';
}

console.log('🚀 Inicializando cliente WhatsApp...');
client.initialize();
