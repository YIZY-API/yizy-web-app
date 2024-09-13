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
				field('page', 'int'),
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
				field('float', 'float'),
				field('float?', 'float?'),
				field('double', 'double'),
				field('double?', 'double?'),
				field('string', 'string'),
				field('string?', 'string?'),
				field('boolean', 'boolean'),
				field('boolean?', 'boolean?'),
				field('int', 'int'),
				field('int?', 'int?'),
				field('int32', 'int32'),
				field('int32?', 'int32?'),
				field('int64', 'int64'),
				field('int64?', 'int64?'),
				field('arrayOfStrings', arrayType('string')),
				field('nullableArrayOfStrings', nullableArrayType('string')),
				field('inlineObject', objectType('InlineObject', [field('test', 'string')])),
				field(
					'nullableInlinedObject',
					nullableObjectType('NullableInlinedObject', [field('test', 'string')])
				)
			]),
			responseModel: objectType('DemoResponse', [field('demo', 'string')])
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
