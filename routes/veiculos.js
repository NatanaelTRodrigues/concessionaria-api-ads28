// routes/veiculos.js
const express = require('express');
const router = express.Router();
let { veiculos, nextId } = require('../models/veiculos');

// Middleware de Validação Obrigatória
const validateVeiculo = (req, res, next) => {
    const { nome, ano, preco } = req.body;
    if (!nome || !ano || !preco) {
        // Retorna 400 Bad Request se campos obrigatórios faltarem
        return res.status(400).json({ message: "Dados inválidos. Campos obrigatórios: nome, ano, preco." });
    }
    // Implemente validação de tipo (ex: ano ser número) aqui
    next();
};

// 1. GET /veiculos - Listar todos
router.get('/', (req, res) => {
    res.status(200).json(veiculos);
});

// 2. POST /veiculos - Criar novo
router.post('/', validateVeiculo, (req, res) => {
    const novoVeiculo = { 
        id: nextId++,
        ...req.body,
        disponivel: true 
    };
    veiculos.push(novoVeiculo);
    res.status(201).json(novoVeiculo); // Status 201 Created
});

// 3. GET /veiculos/:id - Buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);

    if (veiculo) {
        res.status(200).json(veiculo);
    } else {
        res.status(404).json({ message: "Veículo não encontrado." }); // Status 404 Not Found
    }
});

// 4. PUT /veiculos/:id - Atualizar
router.put('/:id', validateVeiculo, (req, res) => {
    const id = parseInt(req.params.id);
    const index = veiculos.findIndex(v => v.id === id);

    if (index !== -1) {
        veiculos[index] = { ...veiculos[index], ...req.body, id: id };
        res.status(200).json(veiculos[index]);
    } else {
        res.status(404).json({ message: "Veículo não encontrado para atualização." });
    }
});

// 5. DELETE /veiculos/:id - Deletar
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = veiculos.length;
    // O array global é atualizado para a nova versão filtrada
    veiculos = veiculos.filter(v => v.id !== id);

    if (veiculos.length < initialLength) {
        res.status(200).json({ message: "Veículo removido com sucesso." });
    } else {
        res.status(404).json({ message: "Veículo não encontrado para remoção." });
    }
});

module.exports = router;