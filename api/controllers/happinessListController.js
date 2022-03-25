const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const happinessSchemaJson = require('../schemas/happiness_json');
validator.addSchema(happinessSchemaJson);

const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const happinessSchemaXml = require('../schemas/happiness_xsd');
const xmlDoc = libxml.parseXmlString(happinessSchemaXml)

// select everything from the table happinessList
exports.getAllHappinessList = (req, res, next) => {
    mysql.query('SELECT * FROM happinessList',(err, happinessIndex) => {
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
// select everything from the table happinessList based on ID
exports.getAllHappinessId = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        mysql.query('SELECT * FROM happinessList WHERE id = ' + id, (err, happinessIndex)  => {
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

        mysql.query('SELECT * FROM happinessList WHERE id = ' + id, (err, happinessIndex)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({happinessIndexes: {happinessIndex}}));
            }
        });
    }
}
// Create a new entry in the table happinessList
exports.postHappinessList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const happiness_rank = req.body.happiness_rank;
        const happiness_score = req.body.happiness_score
        const country_economy = req.body.country_economy;

        try {
            validator.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const happiness_record = {
            country: country,
            happiness_rank: happiness_rank,
            happiness_score: happiness_score,
            country_economy: country_economy,
            
        };

        mysql.query('INSERT INTO happinessList SET ?', happiness_record, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({happinessIndexes: {happinessIndex:  req.body}});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const happinessXmlData = libxml.parseXmlString(req.body);

        const country = happinessXmlData.get('//country');
        const happiness_rank = happinessXmlData.get('//happiness-rank');
        const happiness_score = happinessXmlData.get('//happiness-score');
        const country_economy = happinessXmlData.get('//country-economy')

        if(happinessXmlData.validate(xmlDoc)) {
            const happinessDetails = {
                country: country.text(),
                happiness_rank: happiness_rank.text(),
                happiness_score: happiness_score.text(),
                country_economy:country_economy.text(),

            };
            mysql.query('INSERT INTO happinessList SET ?', happinessDetails, (err) => {
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
// update one entry or multiple in the table happinessList
exports.updateHappinessList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const happiness_rank = req.body.happiness_rank;
        const happiness_score = req.body.happiness_score
        const country_economy = req.body.country_economy;


        try {
            validator.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const happinessDetails = {
            country: country,
            happiness_rank: happiness_rank,
            happiness_score: happiness_score,
            country_economy: country_economy,
        };


        mysql.query('UPDATE happinessList SET ? WHERE id = ' + id, happinessDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({happinessIndexes: {happinessIndexes:  req.body}});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const happinessXmlData = libxml.parseXmlString(req.body);

        const country = happinessXmlData.get('//country');
        const happiness_rank = happinessXmlData.get('//happiness-rank');
        const happiness_score = happinessXmlData.get('//happiness-score');
        const country_economy = happinessXmlData.get('//country-economy')




        if(happinessXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const happinessDetails = {
                country: country.text(),
                happiness_rank: happiness_rank.text(),
                happiness_score: happiness_score.text(),
                country_economy:country_economy.text(),

            };
            mysql.query('UPDATE happinessList SET ? WHERE id = ' + id, happinessDetails, (err) => {
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
exports.deleteHappinessList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;
        mysql.query('DELETE FROM happinessList WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
    if(req.get('Content-Type') === 'application/xml'){
        const id = req.params.id;
        mysql.query('DELETE FROM happinessList WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
