export interface Service {
  name: LanguageSpecificName[];
  baseUrls: string[];
  endpoints: Endpoint[];
  models: Model[];
}

export interface Endpoint {
  url: string;
  requestModel: Field[];
  responseModel: Field[];
}

export interface Field {
  name: LanguageSpecificName[];
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
  | 'array'; //primative type, or array, or object
  modelTypeID: string; // this field is ignored if type is a primative type
}

export interface LanguageSpecificName {
  language: 'default' | 'go' | 'js' | 'cs' | 'c'; // you get the idea
  name: string;
}

export interface Model {
  name: LanguageSpecificName[];
  fields: Field[];
  id: string;
}
