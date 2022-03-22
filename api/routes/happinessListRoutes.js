const express = require('express');
const happinessListRoute = express.Router();
const {getAllHappinessList,getAllHappinessCountry,postHappinessList,updateHappinessList,deleteHappinessList} = require('../controllers/happinessListController');
happinessListRoute.get('/',getAllHappinessList);
happinessListRoute.get('/',getAllHappinessCountry);
happinessListRoute.post('/',postHappinessList);
happinessListRoute.put('/',updateHappinessList);
happinessListRoute.delete('/',deleteHappinessList);

module.exports = happinessListRoute;