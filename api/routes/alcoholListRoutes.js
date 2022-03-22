const express = require('express');
const alcoholListRoute = express.Router();
const {getAllAlcoholList,getAllAlcoholCountry,postAlcoholList,updateAlcoholList,deleteAlcoholList} = require('../controllers/happinessListController');
alcoholListRoute.get('/',getAllAlcoholList);
alcoholListRoute.get('/',getAllAlcoholCountry);
alcoholListRoute.post('/',postAlcoholList);
alcoholListRoute.put('/',updateAlcoholList);
alcoholListRoute.delete('/',deleteAlcoholList);

module.exports = alcoholListRoute;