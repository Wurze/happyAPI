const alcoholSchema = {
    "title": "world alcohol consumption",
    "description": "This schema describes the alcohol consumption around the world",
    "type": "object",
    "properties": {
        "country": {
            "type": "string",
            "minLength": 3,
            "description": "shows the name of the country"
        },
        "beer_servings": {
            "type": "integer",
            "minimum": 1,
            "description": "shows the beer servings of a country"
        },
        "wine_servings": {
            "type": "number",
            "minimum": 0,
            "description": "shows the wine servings of a country"
        },
        "total_litres_of_pure_alcohol": {
            "type": "number",
            "minimum": 0,
            "description": "total liters of alcohol"
        }

    },
    "required": ["country", "total_litres_of_pure_alcohol"]
};

module.exports = alcoholSchema;