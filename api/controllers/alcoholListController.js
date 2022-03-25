const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const alcoholJsonSchema = require('../schemas/alcohol_json');
validator.addSchema(alcoholJsonSchema);
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const alcoholSchemaXml = require('../schemas/alcohol_xsd');
const xmlDoc = libxml.parseXmlString(alcoholSchemaXml);

// select everything from the table alcohollist
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

// select everything from the table alcohollist based on ID
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
// Create a new entry in the table alcohollist
exports.postAlcoholList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const beer_servings = req.body.beer_servings;
        const wine_servings = req.body.wine_servings;
        const total_litres_of_pure_alcohol = req.body.total_litres_of_pure_alcohol;


        try {
            validator.validate(req.body, alcoholJsonSchema, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const alcoholDetails = {
            country: country,
            beer_servings: beer_servings,
            wine_servings: wine_servings,
            total_litres_of_pure_alcohol: total_litres_of_pure_alcohol,

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
        const total_litres_of_pure_alcohol = alcoholXmlData.get('//total_litres_of_pure_alcohol');


        if(alcoholXmlData.validate(xmlDoc)) {
            const alcoholDetails = {
                country: country.text(),
                beer_servings: beer_servings.text(),
                wine_servings: wine_servings.text(),
                total_litres_of_pure_alcohol: total_litres_of_pure_alcohol.text(),
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
// update one entry or multiple in the table alcohollist
exports.updateAlcoholList = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const beer_servings = req.body.beer_servings;
        const wine_servings = req.body.wine_servings;
        const total_litres_of_pure_alcohol = req.body.totalLitresOfPureAlcohol;


        try {
            validator.validate(req.body, alcoholJsonSchema, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const alcoholDetails = {
            country: country,
            beer_servings: beer_servings,
            wine_servings: wine_servings,
            total_litres_of_pure_alcohol: total_litres_of_pure_alcohol,

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
        const total_litres_of_pure_alcohol = alcoholXmlData.get('//total_litres_of_pure_alcohol');



        if(alcoholXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const alcoholDetails = {
                country: country.text(),
                beer_servings: beer_servings.text(),
                wine_servings: wine_servings.text(),
                total_litres_of_pure_alcohol: total_litres_of_pure_alcohol.text(),

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
// Delete from the table based on the ID
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
