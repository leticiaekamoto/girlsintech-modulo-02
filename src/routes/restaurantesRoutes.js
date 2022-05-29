const express = require('express');
const Restaurante = require('../controllers/RestauranteController');



const router = express.Router();

router
    .get('/restaurantes', Restaurante.listarRestaurantes)
    .get('/restaurantes/busca', Restaurante.listarPorStatus)
    .get('/restaurantes/:id', Restaurante.listarRestaurantesPorId)
    .post('/restaurantes', Restaurante.criarFilial)
    .post('/restaurantes/:id/enviar-mensagem', Restaurante.enviarMensagem)
    .put('/restaurantes/:id', Restaurante.atualizarRestaurante)
    .delete('/restaurantes/:id', Restaurante.deletarRestaurante)
    .put('/restaurantes/:id/status-loja', Restaurante.controlarStatus)

module.exports = router