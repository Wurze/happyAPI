const alcoholXmlSchema = '<?xml version="1.0" encoding="UTF-8"?>' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">'+

'    <xs:element name="alcohol">' +
'        <xs:complexType>' +
'            <xs:sequence>' +
'                <xs:element name="alcohols" type="alcoholList" minOccurs="0" maxOccurs="unbounded"/>' +
'            </xs:sequence>' +
'        </xs:complexType>' +
'    </xs:element>' +
    
        '<xs:complexType name="alcoholList">'+
            '<xs:sequence>'+
                '<xs:element name="country" type="xs:string"/>'+
                '<xs:element name="beer_servings" type="xs:integer" maxOccurs="1"/>' +
                '<xs:element name="wine_servings" type="xs:integer" maxOccurs="1"/>' +
                '<xs:element name="litersOfAlc" type="xs:decimal" maxOccurs="1"/>' +
            '</xs:sequence>'+
        '</xs:complexType>'+

'</xs:schema>'

module.exports =alcoholXmlSchema;