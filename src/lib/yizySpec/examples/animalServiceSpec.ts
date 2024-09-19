import {
	type Service,
	field,
	referenceType,
	nullableReferenceType,
	arrayType,
	nullableArrayType,
	objectType,
	nullableObjectType
} from '../YIZYSpec';

export const animalService: Service = {
	serviceName: 'AnimalService',
	baseUrls: ['http://localhost:8080', 'https://dev-server.com'],
	endpoints: [
		{
			url: '/animals/getAnimalByName',
			name: 'getAnimalByName',
			requestModel: objectType('GetAnimalByNameRequest', [field('name', 'string')]),
			responseModel: objectType('GetAnimalByNameResponse', [
				field('error', nullableReferenceType('AnimalServiceException')),
				field('animal', referenceType('Animal'))
			])
		},
		{
			url: '/animals/searchCatsByName',
			name: 'searchCatsByName',
			requestModel: objectType('SearchCatsRequest', [field('query', 'string')]),
			responseModel: objectType('SearchCatsResponse', [
				field('error', nullableReferenceType('AnimalServiceException')),
				field('resultSet', arrayType(referenceType('Cat'))),
				field('totalCount', 'int'),
				field('totalPages', 'int'),
				field('page', 'int')
			])
		},
		{
			url: '/animal/locateMyCat',
			name: 'locateMyCat',
			requestModel: objectType('LocateMyCatRequest', [field('name', 'string')]),
			responseModel: objectType('LocateMyCatResponse', [
				field('error', nullableReferenceType('AnimalServiceException')),
				field(
					'location',
					objectType('Location', [field('longitude', 'string'), field('lattitude', 'string')])
				)
			])
		},
		{
			url: '/demo',
			name: 'demo',
			requestModel: objectType('DemoRequest', [
				field('floatField', 'float'),
				field('nullableFloat', 'float?'),
				field('doubleField', 'double'),
				field('nullableDouble', 'double?'),
				field('stringField', 'string'),
				field('nullableString', 'string?'),
				field('booleanField', 'boolean'),
				field('nullableBooleanField', 'boolean?'),
				field('intField', 'int'),
				field('nullableInt', 'int?'),
				field('int32Field', 'int32'),
				field('nullableInt32', 'int32?'),
				field('int64Field', 'int64'),
				field('nullableInt64', 'int64?'),
				field('arrayOfStrings', arrayType('string')),
				field('nullableArrayOfStrings', nullableArrayType('string')),
				field(
					'nullableArrayOfNullableArrayOfStrings',
					nullableArrayType(nullableArrayType('string'))
				),
				field('inlineObject', objectType('InlineObject', [field('test', 'string')])),
				field(
					'nullableInlinedObject',
					nullableObjectType('InlinedObject', [field('test', 'string')])
				),
				field('arrayOfArrayOfStrings', arrayType(arrayType('string'))),
				field('arrayOfArrayOfArrayOfStrings', arrayType(arrayType(arrayType('string')))),
				field('arrayOfObjects', arrayType(objectType('TestObject', [field('test', 'string')]))),
				field('arrayOfNullableInt', arrayType('int?'))
			]),
			responseModel: objectType('DemoResponse', [field('demo', 'string')])
		},
		{
			url: '/endpointless',
			name: 'noInputAndOutput',
			requestModel: null,
			responseModel: null
		}
	],
	referenceTypes: [
		objectType('Animal', [field('name', 'string'), field('species', 'string')]),
		objectType('Cat', [field('name', 'string'), field('age', 'int'), field('sex', 'string')]),
		objectType('AnimalServiceException', [
			field('code', 'int'),
			field('msg', 'string'),
			field('name', 'string')
		])
	]
};
