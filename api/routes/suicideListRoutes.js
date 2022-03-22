const express = require('express');
const suicideListRoute = express.Router();
const {getAllSuicideList,getAllSuicideId,postSuicideList,updateSuicideList,deleteSuicideList} = require('../controllers/suicideListController');
suicideListRoute.get('/',getAllSuicideList);
suicideListRoute.get('/',getAllSuicideId);
suicideListRoute.post('/',postSuicideList);
suicideListRoute.put('/',updateSuicideList);
suicideListRoute.delete('/',deleteSuicideList);

module.exports = suicideListRoute;