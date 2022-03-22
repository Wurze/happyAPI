const express = require('express');
const happinessListRoute = express.Router();
const {getAllHappinessList,getAllHappinessId,postHappinessList,updateHappinessList,deleteHappinessList} = require('../controllers/happinessListController');
happinessListRoute.get('/',getAllHappinessList);
happinessListRoute.get('/:id',getAllHappinessId);
happinessListRoute.post('/',postHappinessList);
happinessListRoute.put('/:id',updateHappinessList);
happinessListRoute.delete('/:id',deleteHappinessList);

module.exports = happinessListRoute;