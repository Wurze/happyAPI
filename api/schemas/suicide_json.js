const suicideSchema = {
    "title": "world suicide-rates",
    "description": "This schema describes the suicide-rates of both sexes",
    "type": "object",
    "properties": {
        "country": {
            "type": "string",
            "minLength": 3,
            "description": "shows the name of the country"
        },
        "both_rates": {
            "type": "number",
            "minimum": 1,
            "description": "shows both sexes's rates of sucide"
        },
        "male_rates": {
            "type": "number",
            "minimum": 0,
            "description": "shows male suicide-rates"
        },
        "female_rates": {
            "type": "number",
            "minimum": 0,
            "description": "shows female suicide-rates"
        }

    },
    "required": ["country", "both_rates"]
};

module.exports = suicideSchema;