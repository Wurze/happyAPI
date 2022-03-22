const express = require('express');
const apiRouter = express.Router();

const happinessListRoute = require('./happinessListRoutes');
const alcoholListRoute = require('./alcoholListRoutes');
const suicideListRoute = require('./suicideListRoutes');

// API end-points.

apiRouter.use('/happiness',happinessListRoute);
apiRouter.use('/alcohol',alcoholListRoute);
apiRouter.use('/suicide',suicideListRoute);

module.exports = apiRouter;