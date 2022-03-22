const express = require('express');
const alcoholListRoute = express.Router();
const {getAllAlcoholList,getAlcoholById,postAlcoholList,updateAlcoholList,deleteAlcoholList} = require('../controllers/alcoholListController');
alcoholListRoute.get('/',getAllAlcoholList);
alcoholListRoute.get('/:id',getAlcoholById);
alcoholListRoute.post('/',postAlcoholList);
alcoholListRoute.put('/:id',updateAlcoholList);
alcoholListRoute.delete('/:id',deleteAlcoholList);

module.exports = alcoholListRoute;