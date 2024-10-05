export const tsSpec = `
import {  type Service,
          field,
          referenceType,
          nullableReferenceType,
          objectType 
       } from '../yizy';

export const secretService: Service = {
	serviceName: 'SecretService',
	baseUrls: ['http://localhost:8080'],
	endpoints: [
		{
			url: '/agents/getAgentByName',
			name: 'getAgentByName',
			requestModel: objectType('GetAgentByNameRequest',
            [
                field('name', 'string')
            ]),
			responseModel: objectType('GetAgentByNameResponse', 
            [
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
		objectType('Grenade', 
                   [
                     field('code', 'int'),
                     field('msg', 'string'),
                     field('name', 'string')
                   ])
	]
};
`;
export const jsonSpec = ` 
{
    "serviceName": "SecretService",
    "baseUrls": [
        "http://localhost:4010",
        "http://localhost:8080"
    ],
    "endpoints": [
        {
            "url": "/agents/getAgentByName",
            "name": "getAgentByName",
            "requestModel": {
                "name": "GetAgentByNameRequest",
                "fields": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "type": "Object"
            },
            "responseModel": {
                "name": "GetAgentByNameResponse",
                "fields": [
                    {
                        "name": "error",
                        "type": {
                            "ref": "Grenade",
                            "type": "NullableReference"
                        }
                    },
                    {
                        "name": "agent",
                        "type": {
                            "ref": "Agent",
                            "type": "Reference"
                        }
                    }
                ],
                "type": "Object"
            }
        }
    ],
    "referenceTypes": [
        {
            "name": "Agent",
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
                    "name": "department",
                    "type": "string"
                }
            ],
            "type": "Object"
        },
        {
            "name": "Grenade",
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
export const tsClient = `
export interface Agent
{
    name: string;
    age: number;
    department: string;
}

export interface Grenade
{
    code: number;
    msg: string;
    name: string;
}

export interface GetAgentByNameRequest
{
    name: string;
}

export interface GetAgentByNameResponse
{
    error: Grenade | null;
    agent: Agent;
}


export async function getAgentByName(req: GetAgentByNameRequest): Promise<GetAgentByNameResponse> {
  const response = await fetch( "http://localhost:4010/agents/getAgentByName", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req)
  });

  const result: GetAgentByNameResponse = await response.json();
  return result;
}
    `;
