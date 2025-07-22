const express = require('express');
const app = express();

console.log('🌐 Bot Web Simples (sem WhatsApp Web por enquanto)');
console.log('📱 Simulador de controle de gastos');

app.use(express.json());

let gastos = [];

app.get('/', (req, res) => {
  res.send(`
    <h1>🤖 Bot de Controle de Gastos</h1>
    <h2>💰 Gastos Registrados:</h2>
    <ul>
      ${gastos.map(g => `<li>R\$ ${g.valor} - ${g.descricao} (${g.categoria}) - ${g.data}</li>`).join('')}
    </ul>
    <h3>📝 Adicionar Gasto:</h3>
    <form action="/gasto" method="post">
      <input type="number" name="valor" placeholder="Valor" step="0.01" required>
      <input type="text" name="descricao" placeholder="Descrição" required>
      <button type="submit">Adicionar</button>
    </form>
  `);
});

app.post('/gasto', (req, res) => {
  const { valor, descricao } = req.body;
  const categoria = categorizarGasto(descricao);
  const data = new Date().toLocaleString('pt-BR');
  
  gastos.push({ valor, descricao, categoria, data });
  
  console.log('💰 Novo gasto:', valor, descricao, categoria);
  res.redirect('/');
});

function categorizarGasto(descricao) {
  const desc = descricao.toLowerCase();
  if (desc.includes('almoço') || desc.includes('café')) return '🍽️ Alimentação';
  if (desc.includes('uber') || desc.includes('taxi')) return '🚗 Transporte';
  if (desc.includes('mercado')) return '🛒 Compras';
  return '�� Outros';
}

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
  console.log('📱 Abra no navegador para testar!');
});
