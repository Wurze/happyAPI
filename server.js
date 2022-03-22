const express = require('express');
// for parsing both data formats
const bodyParser = require('body-parser');
//for error handling
const errorHandler = require('errorhandler');
// for making requests
const cors = require('cors');
const morgan = require('morgan');
app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw({type: 'application/xml'}));
app.use(cors());
app.use(morgan('dev'))
app.use(errorHandler());
const routerAPI = require('./api/routes/apiRoute');
// defining a path of the routes i.e /zacoAPI/happiness
app.use('/zacoAPI',routerAPI);
const  PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
})
module.exports = app;