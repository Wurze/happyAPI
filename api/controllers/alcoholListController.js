const mysql = require('../../dbConnection');

const JsonValidator = require('jsonschema').Validator;
const validator = new JsonValidator();
const alcoholJsonSchema = require('../schemas/alcohol.schema.json')
validator.addSchema(alcoholJsonSchema);
const xml = require("object-to-xml");
const libxml = require('libxmljs2');

const alcoholSchemaXml = require('../schemas/alcohol_xsd');
const xmlDoc = libxml.parseXmlString(alcoholSchemaXml)

exports.create = (req,res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
};

exports.getAllAlcohols = (req, res, next) => {
    dbConnect.query('SELECT * FROM alcohol',(err, alcoholConsumption) => {
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

        dbConnect.query('SELECT * FROM alcohol WHERE id = ' + id, (err, alcohol)  => {
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

        dbConnect.query('SELECT * FROM alcohol WHERE id = ' + id, (err, alcohol)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send(xml({alcohols:{alcohol: alcohol}}));
            }
        });
    }

}

exports.postAlcohol = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const country = req.body.country;
        const beerServings = req.body.beerServings;
        const wineServings = req.body.wineServings;
        const totalLitresOfPureAlcohol = req.body.totalLitresOfPureAlcohol


        try {
            v.validate(req.body, alcoholSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }

        const alcoholDetails = {
            country: country,
            beerServings: beerServings,
            wineServings: wineServings,
            totalLitresOfPureAlcohol: totalLitresOfPureAlcohol,

        };

        dbConnect.query('INSERT INTO alcohol SET ?', alcoholDetails, (err) => {
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
        const beerServings = alcoholXmlData.get('//beer_servings');
        const wineServings = alcoholXmlData.get('//wine_servings');
        const spiritServings = alcoholXmlData.get('//spirit_Servings');
        const totalLitresOfPureAlcohol = alcoholXmlData.get('//litersOfPureAlc');


        if(alcoholXmlData.validate(xmlDoc)) {
            const alcoholDetails = {
                country: country.text(),
                beerServings: beerServings.text(),
                wineServings: wineServings.text(),
                spiritServings: spiritServings.text(),
                totalLitresOfPureAlcohol: totalLitresOfPureAlcohol.text(),
            };
            dbConnect.query('INSERT INTO alcohol SET ?', alcoholDetails, (err) => {
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

exports.updateAlcohol = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        const country = req.body.country;
        const beerServings = req.body.beerServings
        const wineServings = req.body.wineServings;
        const totalLitresOfPureAlcohol = req.body.totalLitresOfPureAlcohol


        try {
            v.validate(req.body, alcoholSchemaJson, {throwError: true})
        } catch (e) {
            res.status(401).send('Json does not match with schema ' + e.message);
            return;
        }
        const alcoholDetails = {
            country: country,
            beerServings: beerServings,
            wineServings: wineServings,
            totalLitresOfPureAlcohol: totalLitresOfPureAlcohol,

        };


        dbConnect.query('UPDATE alcohol SET ? WHERE id = ' + id, alcoholDetails, (err)  => {
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
        const beerServings = alcoholXmlData.get('//beer_servings');
        const wineServings = alcoholXmlData.get('//wine_servings');
        const spiritServings = alcoholXmlData.get('//spirit_Servings');
        const totalLitresOfPureAlcohol = alcoholXmlData.get('//litersOfPureAlc');




        if(alcoholXmlData.validate(xmlDoc)) {
            const id = req.params.id;
            const alcoholDetails = {
                country: country.text(),
                beerServings: beerServings.text(),
                wineServings: wineServings.text(),
                spiritServings: spiritServings.text(),
                totalLitresOfPureAlcohol: totalLitresOfPureAlcohol.text(),

            };
            dbConnect.query('UPDATE alcohol SET ? WHERE id = ' + id, alcoholDetails, (err) => {
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

exports.deleteAlcohol = (req, res, next) => {
    if(req.get('Content-Type') === 'application/json') {
        const id = req.params.id;

        dbConnect.query('DELETE FROM alcohol WHERE id = ' + id, (err)  => {
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

        dbConnect.query('DELETE FROM alcohol WHERE id = ' + id, (err)  => {
            if(err) {
                next(err)
            }
            else {
                res.status(200).send("Deleted successfully");
            }
        });
    }
}
}