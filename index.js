const wppconnect = require('@wppconnect-team/wppconnect');
const express = require('express');

console.log('🤖 Bot Controle de Gastos - Render');
console.log('�� Iniciando na nuvem gratuita...');

const PORT = process.env.PORT || 3000;
const app = express();

// Armazenar gastos em memória
let gastos = [];

// Rota principal
app.get('/', (req, res) => {
  res.send('🤖 Bot WhatsApp funcionando!\n⏰ ' + new Date().toLocaleString('pt-BR'));
});

// Rota para QR Code
app.get('/qr', (req, res) => {
  res.send(`
    <html>
      <head><title>QR Code WhatsApp</title></head>
      <body>
        <h1>🤖 Conectar WhatsApp Bot</h1>
        <p>📱 Escaneie o QR Code no WhatsApp</p>
        <p>⏰ ${new Date().toLocaleString('pt-BR')}</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🌐 Servidor rodando na porta ${PORT}`);
});

wppconnect
  .create({
    session: 'controle-gastos-render',
    headless: true,
    debug: false,
    logQR: true,
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  })
  .then((client) => {
    console.log('🎉 BOT CONECTADO!');

    client.onAnyMessage(async (message) => {
      if (message.fromMe && message.body) {
        const texto = message.body.toLowerCase().trim();

        // Adicionar gasto: !gasto 50 almoço
        if (texto.startsWith('!gasto ')) {
          const partes = texto.split(' ');
          const valor = parseFloat(partes[1]);
          const descricao = partes.slice(2).join(' ');
          
          if (valor && descricao) {
            gastos.push({ valor, descricao, data: new Date() });
            await client.sendText(message.from, `💰 Gasto adicionado: R\$ ${valor.toFixed(2)} - ${descricao}`);
          }
        }

        // Ver gastos: !gastos
        if (texto === '!gastos') {
          if (gastos.length === 0) {
            await client.sendText(message.from, '📊 Nenhum gasto registrado ainda.');
          } else {
            let lista = '📊 *SEUS GASTOS:*\n\n';
            gastos.forEach((gasto, i) => {
              lista += `${i+1}. R\$ ${gasto.valor.toFixed(2)} - ${gasto.descricao}\n`;
            });
            await client.sendText(message.from, lista);
          }
        }

        // Ver total: !total
        if (texto === '!total') {
          const total = gastos.reduce((sum, gasto) => sum + gasto.valor, 0);
          await client.sendText(message.from, `💸 *TOTAL GASTO:* R\$ ${total.toFixed(2)}`);
        }

        // Ajuda: !ajuda
        if (texto === '!ajuda') {
          const ajuda = `🤖 *COMANDOS DO BOT:*

!gasto [valor] [descrição] - Adicionar gasto
!gastos - Ver todos os gastos
!total - Ver total gasto
!ajuda - Ver comandos

*Exemplo:*
!gasto 25.50 almoço`;
          await client.sendText(message.from, ajuda);
        }
      }
    });
  })
  .catch((error) => {
    console.error('❌ Erro:', error);
  });
