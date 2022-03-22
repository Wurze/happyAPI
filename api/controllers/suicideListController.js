const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const suicideSchemaJson = require('../schemas/suicide_json');
validator.addSchema(suicideSchemaJson);

const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const suicideSchemaXml = require('../schemas/suicide_xsd');
const xmlDoc = libxml.parseXmlString(suicideSchemaXml);


exports.getAllSuicideList = (req, res, next) => {
    mysql.query('SELECT * FROM suicideList',(err, happinessIndex) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({happinessIndexes: {happinessIndex}});
            }
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({happinessIndexes: {happinessIndex}}));
            }
        }
    });
}

exports.getAllSuicideId = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        mysql.query('SELECT * FROM suicideList WHERE id = ' + id, (err, happinessIndex)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({happinessIndexes: {happinessIndex}})
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        mysql.query('SELECT * FROM suicideList WHERE id = ' + id, (err, happinessIndex)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({happinessIndexes: {happinessIndex}}));
            }
        });
    }
}

exports.postSuicideList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const sex = req.body.sex;
        const suicide_rates = req.body.suicide_rates;

        try {
            validator.validate(req.body, suicideSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const suicideDetails = {
            country: country,
            sex: sex,
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
        const sex = suicideXmlData.get('//sex');
        const suicide_rates = suicideXmlData.get('//suicide_rates');

        if(suicideXmlData.validate(xmlDoc)) {
            const suicideDetails = {
                country: country.text(),
                sex: sex.text(),
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

exports.updateSuicideList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const sex = req.body.sex;
        const suicide_rates = req.body.suicide_rates;
        


        try {
            validator.validate(req.body, suicideSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const suicideDetails = {
            country: country,
            sex: sex,
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
        const sex = suicideXmlData.get('//sex');
        const suicide_rates = suicideXmlData.get('//suicide_rates');




        if(suicideXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const suicideDetails = {
                country: country.text(),
                sex: sex.text(),
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
