import {
	type Service,
	field,
	referenceType,
	nullableReferenceType,
	arrayType,
	objectType
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
			url: '/animal/findMyCat',
			name: 'locateMyCat',
			requestModel: objectType('LocateMyCatRequest', [field('name', 'string')]),
			responseModel: objectType('LocateMyCatResponse', [
				field('error', nullableReferenceType('AnimalServiceException')),
				field('location', referenceType('Location'))
			])
		}
	],
	referenceTypes: [
		objectType('Location', [field('longitude', 'string'), field('lattitude', 'string')]),
		objectType('Animal', [field('name', 'string'), field('species', 'string')]),
		objectType('Cat', [field('name', 'string'), field('age', 'int'), field('sex', 'string')]),
		objectType('AnimalServiceException', [
			field('code', 'int'),
			field('msg', 'string'),
			field('name', 'string')
		])
	]
};
