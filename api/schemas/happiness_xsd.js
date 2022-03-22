<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" targetNamespace="http://www.zaco.com/happiness" xmlns:tns="http://www.zaco.com/happiness">
    <xs:element name="happiness-record" type="tns:happiness-record"/>
        <xs:complexType name="happiness-record">
            <xs:sequence>
                <xs:element name="country-name" type="xs:string"/>
                <xs:element name="happiness-score" type="xs:float"/>
                <xs:element name="happiness-record" type="xs:integer"/>
                <xs:element name="country-economy" type="xs:float"/>
            </xs:sequence>
        </xs:complexType>

    <xs:simpleType name="country-name">

        <xs:restriction base="xs:string">

        </xs:restriction>
    </xs:simpleType>
</xs:schema>
