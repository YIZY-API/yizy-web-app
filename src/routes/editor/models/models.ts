export interface Document {
  name: string;
  environment: Environment[];
  description: string;
  endpoints: Endpoint[];
  additionalModels: Model[];
}

export interface Environment {
  name: string;
  baseUrl: string;
}

export interface Endpoint {
  name: string;
  url: string;
  description: string;
  req: Model;
  res: Model;
}

export interface Model {
  name: string;
  fields: Field[];
}
export interface Field {
  name: string;
  type: string;
}
