const happinessXMLSchema = '<?xml version="1.0" encoding="UTF-8"?>'+
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">'+
'    <xs:element name="happiness">' +
'        <xs:complexType>' +
'            <xs:sequence>' +
'                <xs:element name="countries" type="happinessList" minOccurs="0" maxOccurs="unbounded"/>' +
'            </xs:sequence>' +
'        </xs:complexType>' +
'    </xs:element>' +
        '<xs:complexType name="happinessList">'+
            '<xs:sequence>'+
                '<xs:element name="country" type="xs:string"/>'+
                '<xs:element name="happiness-rank" type="xs:integer"/>'+
                '<xs:element name="happiness-score" type="xs:float"/>'+
                '<xs:element name="country-economy" type="xs:float"/>'+
            '</xs:sequence>'+
        '</xs:complexType>'+

   '<xs:simpleType name="country">'+

        '<xs:restriction base="xs:string">'+

        '</xs:restriction>'+
    '</xs:simpleType>'+
'</xs:schema>'


module.exports = happinessXMLSchema;