const express = require('express');
const suicideListRoute = express.Router();
const {getAllSuicideList,getAllSuicideCountry,postSuicideList,updateSuicideList,deleteSuicideList} = require('../controllers/suicideListController');
suicideListRoute.get('/',getAllSuicideList);
suicideListRoute.get('/',getAllSuicideCountry);
suicideListRoute.post('/',postSuicideList);
suicideListRoute.put('/',updateSuicideList);
suicideListRoute.delete('/',deleteSuicideList);

module.exports = suicideListRoute;