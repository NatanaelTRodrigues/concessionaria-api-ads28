// routes/modelos.js
const express = require('express');
const router = express.Router();
let { modelos, nextId } = require('../models/modelos'); 

// Middleware de Validação: Marca e Nome são obrigatórios
const validateModelo = (req, res, next) => {
    const { marca, nome, tipo } = req.body;
    
    if (!marca || !nome || !tipo) {
        return res.status(400).json({ 
            message: "Dados inválidos. Campos obrigatórios para Modelo: marca, nome e tipo." 
        });
    }
    next();
};

// ... Implementação CRUD (GET, POST, PUT, DELETE) similar a clientes.js ...

// 1. GET /modelos - Listar todos
router.get('/', (req, res) => { res.status(200).json(modelos); });

// 2. POST /modelos - Criar novo
router.post('/', validateModelo, (req, res) => {
    const novoModelo = { id: nextId++, ...req.body };
    modelos.push(novoModelo);
    res.status(201).json(novoModelo);
});

// 3. GET /modelos/:id - Buscar por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const modelo = modelos.find(m => m.id === id);
    if (modelo) { res.status(200).json(modelo); } else { res.status(404).json({ message: "Modelo não encontrado." }); }
});

// 4. PUT /modelos/:id - Atualizar
router.put('/:id', validateModelo, (req, res) => {
    const id = parseInt(req.params.id);
    const index = modelos.findIndex(m => m.id === id);
    if (index !== -1) {
        modelos[index] = { ...modelos[index], ...req.body, id: id };
        res.status(200).json(modelos[index]);
    } else { res.status(404).json({ message: "Modelo não encontrado para atualização." }); }
});

// 5. DELETE /modelos/:id - Deletar
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = modelos.length;
    modelos = modelos.filter(m => m.id !== id);
    if (modelos.length < initialLength) { res.status(200).json({ message: "Modelo removido com sucesso." }); } else { res.status(404).json({ message: "Modelo não encontrado para remoção." }); }
});

module.exports = router;