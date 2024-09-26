import { type Service, field, referenceType, nullableReferenceType, objectType } from '../YIZYSpec';

export const secretService: Service = {
	serviceName: 'SecretService',
	baseUrls: ['http://localhost:4010', 'http://localhost:8080'],
	endpoints: [
		{
			url: '/agents/getAgentByName',
			name: 'getAgentByName',
			requestModel: objectType('GetAgentByNameRequest', [field('name', 'string')]),
			responseModel: objectType('GetAgentByNameResponse', [
				field('error', nullableReferenceType('Grenade')),
				field('agent', referenceType('Agent'))
			])
		}
	],
	referenceTypes: [
		objectType('Agent', [
			field('name', 'string'),
			field('age', 'int'),
			field('department', 'string')
		]),
		objectType('Grenade', [field('code', 'int'), field('msg', 'string'), field('name', 'string')])
	]
};
