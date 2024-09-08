export interface Service {
  serviceName: LanguageSpecificName[];
  baseUrls: string[];
  endpoints: Endpoint[];
  additionalTypes: Type[];
}

export interface Endpoint {
  url: string;
  requestModel: Field[];
  responseModel: Field[];
}

export interface Field {
  field: LanguageSpecificName[];
  type:
  | 'number'
  | 'float'
  | 'double'
  | 'string'
  | 'boolean'
  | 'int'
  | 'int32'
  | 'int64'
  | 'object'
  | 'array';
  itemType?:
  | 'number'
  | 'float'
  | 'double'
  | 'string'
  | 'boolean'
  | 'int'
  | 'int32'
  | 'int64'
  | 'object'
  | 'array'
  | string
  | null; // this field is ignored if type is a primative type
}

export interface LanguageSpecificName {
  language: 'default' | 'go' | 'js' | 'cs' | 'c'; // you get the idea
  name: string;
}

export interface Type {
  id: string;
  name: LanguageSpecificName[];
  fields: Field[];
}
let animalService: Service = {
  serviceName: [
    {
      language: 'default',
      name: 'animal-service'
    },
    {
      language: 'go',
      name: 'AnimalService'
    }
  ],
  baseUrls: [
    'http://localhost:8080',
    'https://dev-server.com',
    'https://staging-server.com',
    'https://server.com'
  ],
  endpoints: [
    {
      url: '/animals/getAnimalByName',
      requestModel: [
        {
          field: [{ language: 'default', name: 'name' }],
          type: 'string'
        }
      ],
      responseModel: [
        {
          field: [{ language: 'default', name: 'error' }],
          type: 'string'
        },
        {
          field: [{ language: 'default', name: 'result' }],
          type: 'object',
          itemType: 'Animal'
        }
      ]
    }
  ],
  additionalTypes: [
    {
      id: 'Animal',
      name: [
        {
          language: 'default',
          name: 'Animal'
        }
      ],
      fields: [
        {
          field: [
            {
              language: 'default',
              name: 'name'
            }
          ],
          type: 'string'
        },
        {
          field: [{ language: 'default', name: 'species' }],
          type: 'string'
        }
      ]
    }
  ]
};

JSON.stringify(animalService);

export interface GetAnimalByNameRequest {
  Name: string;
}

export interface GetAnimalByNameResponse {
  Error: string;
  Result: Animal;
}

export interface Animal {
  Name: string;
  Species: string;
}
