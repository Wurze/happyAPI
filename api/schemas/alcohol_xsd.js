const alcoholXmlSchema = '<?xml version="1.0" encoding="UTF-8"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">'+
    '<xs:element name="alcohol-consumption-record">'+
        '<xs:complexType>'+
            '<xs:sequence>'+
                '<xs:element name="country-name" type="xs:string"/>'+
                '<xs:element name="beer_servings" type="xs:integer" maxOccurs="1"/>' +
    '            <xs:element name="spirit_Servings" type="xs:integer" maxOccurs="1"/>' +
    '            <xs:element name="wine_servings" type="xs:integer" maxOccurs="1"/>' +
    '            <xs:element name="litersOfAlc" type="xs:decimal" maxOccurs="1"/>' +
            '</xs:sequence>'+
        '</xs:complexType>'+
    '</xs:element>'+
'</xs:schema>'

module.exports =alcoholXmlSchema;