const suicideSchema = {
    "title": "world suicide-rates",
    "description": "This schema describes the suicide-rates of both sexes in the world",
    "type": "object",
    "properties": {
        "country": {
            "type": "string",
            "minLength": 3,
            "description": "shows the name of the country"
        },
        "suicide_rates": {
            "type": "number",
            "minimum": 0,
            "description": "shows suicide-rates"
        }

    },
    "required": ["country", "suicide_rates"]
};

module.exports = suicideSchema;