<script lang="ts">
	import { type Service } from '$lib/yizySpec/YIZYSpec';
	const json = `
{
    "serviceName": "AnimalService",
    "baseUrls": [
        "http://localhost:8080",
        "https://dev-server.com"
    ],
    "endpoints": [
        {
            "url": "/animals/getAnimalByName",
            "name": "getAnimalByName",
            "requestModel": {
                "name": "GetAnimalByNameRequest",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "type": "Object"
            },
            "responseModel": {
                "name": "GetAnimalByNameResponse",
                "fields": [
                    {
                        "name": "error",
                        "type": {
                            "ref": "AnimalServiceException",
                            "type": "NullableReference"
                        }
                    },
                    {
                        "name": "animal",
                        "type": {
                            "ref": "Animal",
                            "type": "Reference"
                        }
                    }
                ],
                "type": "Object"
            }
        },
        {
            "url": "/animals/searchCatsByName",
            "name": "searchCatsByName",
            "requestModel": {
                "name": "SearchCatsRequest",
                "fields": [
                    {
                        "name": "query",
                        "type": "string"
                    }
                ],
                "type": "Object"
            },
            "responseModel": {
                "name": "SearchCatsResponse",
                "fields": [
                    {
                        "name": "error",
                        "type": {
                            "ref": "AnimalServiceException",
                            "type": "NullableReference"
                        }
                    },
                    {
                        "name": "resultSet",
                        "type": {
                            "itemType": {
                                "ref": "Cat",
                                "type": "Reference"
                            },
                            "type": "Array"
                        }
                    },
                    {
                        "name": "totalCount",
                        "type": "int"
                    },
                    {
                        "name": "totalPages",
                        "type": "int"
                    },
                    {
                        "name": "page",
                        "type": "int"
                    }
                ],
                "type": "Object"
            }
        },
        {
            "url": "/animal/locateMyCat",
            "name": "locateMyCat",
            "requestModel": {
                "name": "LocateMyCatRequest",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "type": "Object"
            },
            "responseModel": {
                "name": "LocateMyCatResponse",
                "fields": [
                    {
                        "name": "error",
                        "type": {
                            "ref": "AnimalServiceException",
                            "type": "NullableReference"
                        }
                    },
                    {
                        "name": "location",
                        "type": {
                            "name": "Location",
                            "fields": [
                                {
                                    "name": "longitude",
                                    "type": "string"
                                },
                                {
                                    "name": "lattitude",
                                    "type": "string"
                                }
                            ],
                            "type": "Object"
                        }
                    }
                ],
                "type": "Object"
            }
        },
        {
            "url": "/demo",
            "name": "demo",
            "requestModel": {
                "name": "DemoRequest",
                "fields": [
                    {
                        "name": "floatField",
                        "type": "float"
                    },
                    {
                        "name": "floatField?",
                        "type": "float?"
                    },
                    {
                        "name": "doubleField",
                        "type": "double"
                    },
                    {
                        "name": "doubleField?",
                        "type": "double?"
                    },
                    {
                        "name": "stringField",
                        "type": "string"
                    },
                    {
                        "name": "stringField?",
                        "type": "string?"
                    },
                    {
                        "name": "booleanField",
                        "type": "boolean"
                    },
                    {
                        "name": "booleanField?",
                        "type": "boolean?"
                    },
                    {
                        "name": "intField",
                        "type": "int"
                    },
                    {
                        "name": "intField?",
                        "type": "int?"
                    },
                    {
                        "name": "int32Field",
                        "type": "int32"
                    },
                    {
                        "name": "int32Field?",
                        "type": "int32?"
                    },
                    {
                        "name": "int64Field",
                        "type": "int64"
                    },
                    {
                        "name": "int64Field?",
                        "type": "int64?"
                    },
                    {
                        "name": "arrayOfStrings",
                        "type": {
                            "itemType": "string",
                            "type": "Array"
                        }
                    },
                    {
                        "name": "nullableArrayOfStrings",
                        "type": {
                            "itemType": "string",
                            "type": "NullableArray"
                        }
                    },
                    {
                        "name": "inlineObject",
                        "type": {
                            "name": "InlineObject",
                            "fields": [
                                {
                                    "name": "test",
                                    "type": "string"
                                }
                            ],
                            "type": "Object"
                        }
                    },
                    {
                        "name": "nullableInlinedObject",
                        "type": {
                            "type": "NullableObject",
                            "name": "InlinedObject",
                            "fields": [
                                {
                                    "name": "test",
                                    "type": "string"
                                }
                            ]
                        }
                    }
                ],
                "type": "Object"
            },
            "responseModel": {
                "name": "DemoResponse",
                "fields": [
                    {
                        "name": "demo",
                        "type": "string"
                    }
                ],
                "type": "Object"
            }
        }
    ],
    "referenceTypes": [
        {
            "name": "Animal",
            "fields": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "species",
                    "type": "string"
                }
            ],
            "type": "Object"
        },
        {
            "name": "Cat",
            "fields": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "age",
                    "type": "int"
                },
                {
                    "name": "sex",
                    "type": "string"
                }
            ],
            "type": "Object"
        },
        {
            "name": "AnimalServiceException",
            "fields": [
                {
                    "name": "code",
                    "type": "int"
                },
                {
                    "name": "msg",
                    "type": "string"
                },
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "type": "Object"
        }
    ]
}
`;

	const service: Service = JSON.parse(json);
</script>
