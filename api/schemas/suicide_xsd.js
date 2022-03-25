const suicideXMLSchema = '<?xml version="1.0" encoding="UTF-8"?>'+
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">'+
'    <xs:element name="suicide">' +
'        <xs:complexType>' +
'            <xs:sequence>' +
'                <xs:element name="suicides" type="suicide-record" minOccurs="0" maxOccurs="unbounded"/>' +
'            </xs:sequence>' +
'        </xs:complexType>' +
'    </xs:element>' +

    
       ' <xs:complexType name="suicide-record">'+
           '<xs:sequence>'+
                '<xs:element name="country" type="xs:string"/>'+
                '<xs:element name="suicide-rates" type="xs:double"/>'+
            '</xs:sequence>'+
        '</xs:complexType>'+
'</xs:schema>'

module.exports = suicideXMLSchema;