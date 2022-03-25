const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const suicideSchemaJson = require('../schemas/suicide_json');
validator.addSchema(suicideSchemaJson);

const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const suicideSchemaXml = require('../schemas/suicide_xsd');
const xmlDoc = libxml.parseXmlString(suicideSchemaXml);

// select everything from the table suicideList
exports.getAllSuicideList = (req, res, next) => {
    mysql.query('SELECT * FROM suicideList',(err, suicideRate) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({suicideRates: {suicideRate}});
            }
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({suicideRates: {suicideRate}}));
            }
        }
    });
}
// select everything from the table suicideList based on ID
exports.getAllSuicideId = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        mysql.query('SELECT * FROM suicideList WHERE id = ' + id, (err, suicideRate)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({suicideRates: {suicideRate}})
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        mysql.query('SELECT * FROM suicideList WHERE id = ' + id, (err, suicideRate)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({suicideRates: {suicideRate}}));
            }
        });
    }
}
// Create a new entry in the table suicideList
exports.postSuicideList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const suicide_rates = req.body.suicide_rates;

        try {
            validator.validate(req.body, suicideSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const suicideDetails = {
            country: country,
            suicide_rates: suicide_rates,

            
        };

        mysql.query('INSERT INTO suicideList SET ?', suicideDetails, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({suicideRates: {suicideRate:  req.body}});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const suicideXmlData = libxml.parseXmlString(req.body);

        const country = suicideXmlData.get('//country');
        const suicide_rates = suicideXmlData.get('//suicide_rates');

        if(suicideXmlData.validate(xmlDoc)) {
            const suicideDetails = {
                country: country.text(),
                suicide_rates: suicide_rates.text(),

            };
            mysql.query('INSERT INTO suicideList SET ?', suicideDetails, (err) => {
                if(err) {
                    next(err)
                }
                else {
                    res.status(201).send(req.body);
                }
            });
        }
        else {
            res.status(401).send('Xml does not match with xsd schema');
        }
    }
}
// update one entry or multiple in the table suicideList
exports.updateSuicideList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const suicide_rates = req.body.suicide_rates;
        


        try {
            validator.validate(req.body, suicideSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const suicideDetails = {
            country: country,
            suicide_rates: suicide_rates,
            
        };


        mysql.query('UPDATE suicideList SET ? WHERE id = ' + id, suicideDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({suicideRates: {suicideRate:  req.body}});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const suicideXmlData = libxml.parseXmlString(req.body);

        const country = suicideXmlData.get('//country');
        const suicide_rates = suicideXmlData.get('//suicide_rates');




        if(suicideXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const suicideDetails = {
                country: country.text(),
                suicide_rates: suicide_rates.text(),
                

            };
            mysql.query('UPDATE suicideList SET ? WHERE id = ' + id, suicideDetails, (err) => {
                if(err) {
                    next(err)
                }
                else {
                    res.status(201).send(req.body);
                }
            });
        }
        else {
            res.status(401).send('Xml does not match with xsd schema');
        }
    }
}
// Delete from the table based on the ID
exports.deleteSuicideList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;
        mysql.query('DELETE FROM suicideList WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
    if(req.get('Content-Type') === 'application/xml'){
        const id = req.params.id;
        mysql.query('DELETE FROM suicideList WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
