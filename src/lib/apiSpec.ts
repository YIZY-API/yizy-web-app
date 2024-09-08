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
