const express = require('express');
const suicideListRoute = express.Router();
const {getAllSuicideList,getAllSuicideId,postSuicideList,updateSuicideList,deleteSuicideList} = require('../controllers/suicideListController');
suicideListRoute.get('/',getAllSuicideList);
suicideListRoute.get('/:id',getAllSuicideId);
suicideListRoute.post('/',postSuicideList);
suicideListRoute.put('/:id',updateSuicideList);
suicideListRoute.delete('/:id',deleteSuicideList);

module.exports = suicideListRoute;