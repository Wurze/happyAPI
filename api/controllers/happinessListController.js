const dbConnect = require('../dbConnect');

const JsonValidator = require('jsonschema').Validator;
const v = new JsonValidator();
const happinessSchemaJson = require('../schemas/happiness.schema.json');
v.addSchema(happinessSchemaJson);

const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const happinessSchemaXml = require('../schemas/happiness_xsd');
const xmlDoc = libxml.parseXmlString(happinessSchemaXml)

exports.getAllHappinessList = (req, res, next) => {
    dbConnect.query('SELECT * FROM happiness',(err, happinessIndex) => {
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

exports.getAllHappinessId = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        dbConnect.query('SELECT * FROM happiness WHERE id = ' + id, (err, happinessIndex)  => {
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

        dbConnect.query('SELECT * FROM happiness WHERE id = ' + id, (err, happinessIndex)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({happinessIndexes: {happinessIndex}}));
            }
        });
    }
}

exports.postHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const ladderScore = req.body.ladderScore;
        const standardErrorOfLadderScore = req.body.standardErrorOfLadderScore
        const loggedGDPPerCapita = req.body.loggedGDPPerCapita;

        try {
            v.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const happinessDetails = {
            country: country,
            ladderScore: ladderScore,
            standardErrorOfLadderScore: standardErrorOfLadderScore,
            loggedGDPPerCapita: loggedGDPPerCapita,
            
        };

        dbConnect.query('INSERT INTO happiness SET ?', happinessDetails, (err) => {
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
        const ladderScore = happinessXmlData.get('//ladderScore');
        const standardErrorOfLadderScore = happinessXmlData.get('//standardErrorOfLadderScore');
  

        if(happinessXmlData.validate(xmlDoc)) {
            const hapinessDetails = {
                country: country.text(),
                ladderScore: ladderScore.text(),
                standardErrorOfLadderScore: standardErrorOfLadderScore.text(),

            };
            dbConnect.query('INSERT INTO happiness SET ?', hapinessDetails, (err) => {
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

exports.updateHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const ladderScore = req.body.ladderScore;
        const standardErrorOfLadderScore = req.body.standardErrorOfLadderScore;
        const loggedGDPPerCapita = req.body.loggedGDPPerCapita;


        try {
            v.validate(req.body, happinessSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const hapinessDetails = {
            country: country,
            ladderScore: ladderScore,
            standardErrorOfLadderScore: standardErrorOfLadderScore,
            loggedGDPPerCapita: loggedGDPPerCapita,
        };


        dbConnect.query('UPDATE happiness SET ? WHERE id = ' + id, hapinessDetails, (err)  => {
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
        const ladderScore = happinessXmlData.get('//ladderScore');
        const standardErrorOfLadderScore = happinessXmlData.get('//standardErrorOfLadderScore');




        if(happinessXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const hapinessDetails = {
                country: country.text(),
                regionalIndicator: regionalIndicator.text(),
                ladderScore: ladderScore.text(),
                standardErrorOfLadderScore: standardErrorOfLadderScore.text(),

            };
            dbConnect.query('UPDATE happiness SET ? WHERE id = ' + id, hapinessDetails, (err) => {
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
exports.deleteHappiness = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json'){
        const id = req.params.id;
        dbConnect.query('DELETE FROM happiness WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
    if(req.get('Content-Type') === 'application/xml'){
        const id = req.params.id;
        dbConnect.query('DELETE FROM happiness WHERE id = ' + id, (err) => {
            if(err) {
                next(err)
            } else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
