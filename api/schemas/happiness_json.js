const happinessSchema = {
    "title": "world happiness",
    "description": "This schema describes the happiness of the world",
    "type": "object",
    "properties": {
        "country": {
            "type": "string",
            "minLength": 3,
            "description": "shows the name of the country"
        },
        "happiness_rank": {
            "type": "integer",
            "minimum": 1,
            "description": "shows the ladder score"
        },
        "happiness_score": {
            "type": "number",
            "minimum": 0,
            "description": "shows the standard error of ladder score"
        },
        "country_economy": {
            "type": "number",
            "minimum": 0,
            "description": "shows the Logged GDP per capita"
        }

    },
    "required": ["country", "happiness_rank"]
};

module.exports = happinessSchema;
