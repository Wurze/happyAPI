const express = require('express');
const alcoholListRoute = express.Router();
const {getAllAlcoholList,getAlcoholById,postAlcoholList,updateAlcoholList,deleteAlcoholList} = require('../controllers/alcoholListController');
alcoholListRoute.get('/',getAllAlcoholList);
alcoholListRoute.get('/',getAlcoholById);
alcoholListRoute.post('/',postAlcoholList);
alcoholListRoute.put('/',updateAlcoholList);
alcoholListRoute.delete('/',deleteAlcoholList);

module.exports = alcoholListRoute;