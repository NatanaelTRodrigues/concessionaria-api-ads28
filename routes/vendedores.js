// routes/vendedores.js
const express = require('express');
const router = express.Router();
// Importa o array e o nextId do modelo
let { vendedores, nextId } = require('../models/vendedores'); 


const validateVendedor = (req, res, next) => {
    const { nome, matricula, area } = req.body;
    
    // VERIFICAÇÃO ESSENCIAL: Retorna 400 Bad Request se campos obrigatórios faltarem
    if (!nome || !matricula || !area) {
        return res.status(400).json({ 
            message: "Dados inválidos. Campos obrigatórios para Vendedor: nome, matricula, area." 
        });
    }
    next();
};

// 1. GET /vendedores - Listar todos
router.get('/', (req, res) => {
    res.status(200).json(vendedores);
});

// 2. POST /vendedores - Criar novo

router.post('/', validateVendedor, (req, res) => {
    const novoVendedor = {
        id: nextId++,
        ...req.body
    };
    vendedores.push(novoVendedor);
    res.status(201).json(novoVendedor); // Status 201 Created
});

// 3. GET /vendedores/:id - Buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const vendedor = vendedores.find(v => v.id === id);

    if (vendedor) {
        res.status(200).json(vendedor);
    } else {
        res.status(404).json({ message: "Vendedor não encontrado." }); // Status 404 Not Found
    }
});

// 4. PUT /vendedores/:id - Atualizar

router.put('/:id', validateVendedor, (req, res) => {
    const id = parseInt(req.params.id);
    const index = vendedores.findIndex(v => v.id === id);

    if (index !== -1) {

        vendedores[index] = { ...vendedores[index], ...req.body, id: id };
        res.status(200).json(vendedores[index]);
    } else {
        res.status(404).json({ message: "Vendedor não encontrado para atualização." });
    }
});

// 5. DELETE /vendedores/:id - Deletar
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = vendedores.length;
in
    vendedores = vendedores.filter(v => v.id !== id);

    if (vendedores.length < initialLength) {
        res.status(200).json({ message: "Vendedor removido com sucesso." });
    } else {
        res.status(404).json({ message: "Vendedor não encontrado para remoção." });
    }
});

module.exports = router;