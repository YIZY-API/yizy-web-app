import {
  arrayType,
  field,
  nullableArrayType,
  objectType,
  referenceType,
  type Service,
} from "@yizy/specification";

export const testService: Service = {
  serviceName: "TestService",
  baseUrls: ["http://localhost:8080", "https://dev-server.com"],
  endpoints: [
    {
      url: "/demo",
      name: "demo",
      requestModel: objectType("DemoRequest", [
        field("floatField", "float"),
        field("nullableFloat", "float?"),
        field("doubleField", "double"),
        field("nullableDouble", "double?"),
        field("stringField", "string"),
        field("nullableString", "string?"),
        field("booleanField", "boolean"),
        field("nullableBooleanField", "boolean?"),
        field("intField", "int"),
        field("nullableInt", "int?"),
        field("int32Field", "int32"),
        field("nullableInt32", "int32?"),
        field("int64Field", "int64"),
        field("nullableInt64", "int64?"),
        field("arrayOfStrings", arrayType("string")),
        field("nullableArrayOfStrings", nullableArrayType("string")),
        field(
          "nullableArrayOfNullableArrayOfStrings",
          nullableArrayType(nullableArrayType("string")),
        ),
        field("arrayOfArrayOfStrings", arrayType(arrayType("string"))),
        field(
          "arrayOfArrayOfArrayOfStrings",
          arrayType(arrayType(arrayType("string"))),
        ),
        field("arrayOfObjects", arrayType(referenceType("TestObject"))),
        field("arrayOfNullableInt", arrayType("int?")),
      ]),
      responseModel: objectType("DemoResponse", [field("demo", "string")]),
    },
    {
      url: "/endpointless",
      name: "noInputAndOutput",
      requestModel: null,
      responseModel: null,
    },
  ],
  referenceTypes: [objectType("TestObject", [field("test", "string")])],
};
