// routes/vendas.js
const express = require('express');
const router = express.Router();
let { vendas, nextId } = require('../models/vendas'); 
let { veiculos } = require('../models/veiculos'); // Necessário para validação
let { clientes } = require('../models/clientes'); // Necessário para validação
let { vendedores } = require('../models/vendedores'); // Necessário para validação

// Middleware de Validação: Checa campos obrigatórios E a existência dos IDs de referência
const validateVenda = (req, res, next) => {
    const { veiculoId, clienteId, vendedorId, valorFinal } = req.body;
    
    // 1. Validação de campos obrigatórios
    if (!veiculoId || !clienteId || !vendedorId || !valorFinal) {
        return res.status(400).json({ 
            message: "Dados inválidos. Campos obrigatórios para Venda: veiculoId, clienteId, vendedorId, valorFinal." 
        });
    }

    // 2. Validação de Referência (ID existe?)
    if (!veiculos.find(v => v.id === veiculoId)) {
        return res.status(400).json({ message: `veiculoId ${veiculoId} não encontrado.` });
    }
    if (!clientes.find(c => c.id === clienteId)) {
        return res.status(400).json({ message: `clienteId ${clienteId} não encontrado.` });
    }
    if (!vendedores.find(v => v.id === vendedorId)) {
        return res.status(400).json({ message: `vendedorId ${vendedorId} não encontrado.` });
    }

    // (Opcional) Implemente a checagem se o veículo está disponível
    
    next();
};

// ... Implementação CRUD (GET, POST, PUT, DELETE) similar a clientes.js ...

// 1. GET /vendas - Listar todas
router.get('/', (req, res) => { res.status(200).json(vendas); });

// 2. POST /vendas - Criar nova
router.post('/', validateVenda, (req, res) => {
    const novaVenda = { 
        id: nextId++, 
        dataVenda: new Date().toISOString().split('T')[0], 
        ...req.body 
    };
    vendas.push(novaVenda);
    res.status(201).json(novaVenda);
});

// 3. GET /vendas/:id - Buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const venda = vendas.find(v => v.id === id);
    if (venda) { res.status(200).json(venda); } else { res.status(404).json({ message: "Venda não encontrada." }); }
});

// 4. PUT /vendas/:id - Atualizar
router.put('/:id', validateVenda, (req, res) => {
    const id = parseInt(req.params.id);
    const index = vendas.findIndex(v => v.id === id);
    if (index !== -1) {
        vendas[index] = { ...vendas[index], ...req.body, id: id };
        res.status(200).json(vendas[index]);
    } else { res.status(404).json({ message: "Venda não encontrada para atualização." }); }
});

// 5. DELETE /vendas/:id - Deletar
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = vendas.length;
    vendas = vendas.filter(v => v.id !== id);
    if (vendas.length < initialLength) { res.status(200).json({ message: "Venda removida com sucesso." }); } else { res.status(404).json({ message: "Venda não encontrada para remoção." }); }
});

module.exports = router;