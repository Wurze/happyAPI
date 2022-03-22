const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const alcoholJsonSchema = require('../schemas/alcohol.schema.json')
validator.addSchema(alcoholJsonSchema);
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const alcoholSchemaXml = require('../schemas/alcohol_xsd');
const xmlDoc = libxml.parseXmlString(alcoholSchemaXml);


exports.getAllAlcoholList = (req, res, next) => {
    mysql.query('SELECT * FROM alcohollist',(err, alcoholConsumption) => {
        if(err) {
            next(err)
        } else {
            if(req.get('Content-Type') === 'application/xml') {
                res.send(xml({alcoholConsumption: {alcoholConsumption}}));
            }
            if(req.get('Content-Type') === 'application/json') {
                res.status(200).json({alcoholConsumptions: {alcoholConsumption}});
            }
        }
    });
}

exports.getAlcoholById = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        mysql.query('SELECT * FROM alcohollist WHERE id = ' + id, (err, alcohol)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).json({alcohols: {alcohol}})
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        mysql.query('SELECT * FROM alcohollist WHERE id = ' + id, (err, alcohol)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({alcohols:{alcohol: alcohol}}));
            }
        });
    }

}

exports.postAlcoholList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const beer_servings = req.body.beer_servings;
        const wine_servings = req.body.wine_servings;
        const totalLitOfAlc = req.body.totalLitOfAlc


        try {
            v.validate(req.body, alcoholSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const alcoholDetails = {
            country: country,
            beer_servings: beer_servings,
            wine_servings: wine_servings,
            totalLitOfAlc: totalLitOfAlc,

        };

        mysql.query('INSERT INTO alcohollist SET ?', alcoholDetails, (err) => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({alcohols: {alcohol:  req.body}});
            }
        })
    }

    if(req.get('Content-Type') === 'application/xml') {
        const alcoholXmlData = libxml.parseXmlString(req.body);

        const country = alcoholXmlData.get('//country');
        const beer_servings = alcoholXmlData.get('//beer_servings');
        const wine_servings = alcoholXmlData.get('//wine_servings');
        const totalLitOfAlc = alcoholXmlData.get('//litersOfAlc');


        if(alcoholXmlData.validate(xmlDoc)) {
            const alcoholDetails = {
                country: country.text(),
                beer_servings: beer_servings.text(),
                wine_servings: wine_servings.text(),
                totalLitOfAlc: totalLitOfAlc.text(),
            };
            mysql.query('INSERT INTO alcohollist SET ?', alcoholDetails, (err) => {
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

exports.updateAlcoholList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const beer_servings = req.body.beer_servings;
        const wine_servings = req.body.wine_servings;
        const totalLitOfAlc = req.body.totalLitresOfPureAlcohol;


        try {
            v.validate(req.body, alcoholSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const alcoholDetails = {
            country: country,
            beer_servings: beer_servings,
            wine_servings: wine_servings,
            totalLitOfAlc: totalLitOfAlc,

        };


        mysql.query('UPDATE alcohollist SET ? WHERE id = ' + id, alcoholDetails, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(201).json({alcohols: {alcohol:  req.body}});
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const alcoholXmlData = libxml.parseXmlString(req.body);

        const country = alcoholXmlData.get('//country');
        const beer_servings = alcoholXmlData.get('//beer_servings');
        const wine_servings = alcoholXmlData.get('//wine_servings');
        const totalLitOfAlc = alcoholXmlData.get('//litersOfAlc');



        if(alcoholXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const alcoholDetails = {
                country: country.text(),
                beer_servings: beer_servings.text(),
                wine_servings: wine_servings.text(),
                totalLitOfAlc: totalLitOfAlc.text(),

            };
            mysql.query('UPDATE alcohollist SET ? WHERE id = ' + id, alcoholDetails, (err) => {
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

exports.deleteAlcoholList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        mysql.query('DELETE FROM alcohollist WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }

    if(req.get('Content-Type') === 'application/xml') {
        const id = req.params.id;

        mysql.query('DELETE FROM alcohollist WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
