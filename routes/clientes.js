// routes/clientes.js
const express = require('express');
const router = express.Router();
let { clientes, nextId } = require('../models/clientes'); 

// Middleware de Validação: Nome e Email são obrigatórios
const validateCliente = (req, res, next) => {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ 
            message: "Dados inválidos. Campos obrigatórios para Cliente: nome, email." 
        });
    }
    next();
};

// 1. GET /clientes - Listar todos
router.get('/', (req, res) => {
    res.status(200).json(clientes);
});

// 2. POST /clientes - Criar novo
router.post('/', validateCliente, (req, res) => {
    const novoCliente = {
        id: nextId++,
        ...req.body,
        dataCadastro: new Date().toISOString().split('T')[0] // Adiciona data de hoje
    };
    clientes.push(novoCliente);
    res.status(201).json(novoCliente); // Status 201 Created
});

// 3. GET /clientes/:id - Buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        res.status(200).json(cliente);
    } else {
        res.status(404).json({ message: "Cliente não encontrado." });
    }
});

// 4. PUT /clientes/:id - Atualizar
router.put('/:id', validateCliente, (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(c => c.id === id);

    if (index !== -1) {
        clientes[index] = { ...clientes[index], ...req.body, id: id };
        res.status(200).json(clientes[index]);
    } else {
        res.status(404).json({ message: "Cliente não encontrado para atualização." });
    }
});

// 5. DELETE /clientes/:id - Deletar
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = clientes.length;
    clientes = clientes.filter(c => c.id !== id);

    if (clientes.length < initialLength) {
        res.status(200).json({ message: "Cliente removido com sucesso." });
    } else {
        res.status(404).json({ message: "Cliente não encontrado para remoção." });
    }
});

module.exports = router;