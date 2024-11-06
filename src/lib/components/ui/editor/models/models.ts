import {
  type ArrayType,
  type NullableArrayType,
  type NullableReferenceType,
  type PrimitiveTypes,
  type ReferenceType,
  type Service,
  TypeIdentifier,
} from "@yizy/spec";
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

export function yizySpecToDoc(service: Service): Document {
  const doc: Document = {
    name: typeof (service.serviceName) === "string"
      ? service.serviceName as string
      : service.serviceName.default,
    description: service.description,
    environment: service.environment.map((e) => {
      return {
        name: e.name,
        baseUrl: e.url,
      };
    }),
    endpoints: service.endpoints.map((e) => {
      return {
        name: typeof (e.name) === "string" ? e.name : e.name.default,
        url: e.url,
        description: e.description,
        req: e.requestModel === null ? null : {
          name: e.requestModel.name,
          fields: e.requestModel.fields.map((f) => {
            let type = "";
            if (typeof f.type === "string") {
              type = f.type as PrimitiveTypes;
            } else {
              switch (f.type.type) {
                case TypeIdentifier.ArrayType:
                  type = (f.type as ArrayType).itemType + "[]";
                  break;
                case TypeIdentifier.NullableArrayType:
                  type = (f.type as NullableArrayType).itemType + "[]?";
                  break;
                case TypeIdentifier.ReferenceType:
                  type = (f.type as ReferenceType).ref;
                  break;
                case TypeIdentifier.NullableReferenceType:
                  type = (f.type as NullableReferenceType).ref + "?";
                  break;
                default:
                  type = "";
                  break;
              }
            }
            return {
              name: f.name,
              type: type,
            };
          }),
        },
        res: e.responseModel === null ? null : {
          name: e.responseModel.name,
          fields: e.responseModel.fields.map((f) => {
            let type = "";
            if (typeof f.type === "string") {
              type = f.type as PrimitiveTypes;
            } else {
              switch (f.type.type) {
                case TypeIdentifier.ArrayType:
                  type = (f.type as ArrayType).itemType + "[]";
                  break;
                case TypeIdentifier.NullableArrayType:
                  type = (f.type as NullableArrayType).itemType + "[]?";
                  break;
                case TypeIdentifier.ReferenceType:
                  type = (f.type as ReferenceType).ref;
                  break;
                case TypeIdentifier.NullableReferenceType:
                  type = (f.type as NullableReferenceType).ref + "?";
                  break;
                default:
                  type = "";
                  break;
              }
            }
            return {
              name: f.name,
              type: type,
            };
          }),
        },
      };
    }),
    additionalModels: service.referenceTypes.map((t) => {
      return {
        name: typeof (t.name) === "string" ? t.name : t.name.default,
        fields: t.fields.map((f) => {
          let type = "";

          if (typeof f.type === "string") {
            type = f.type as PrimitiveTypes;
          } else {
            switch (f.type.type) {
              case TypeIdentifier.ArrayType:
                type = (f.type as ArrayType).itemType + "[]";
                break;
              case TypeIdentifier.NullableArrayType:
                type = (f.type as NullableArrayType).itemType + "[]?";
                break;
              case TypeIdentifier.ReferenceType:
                type = (f.type as ReferenceType).ref;
                break;
              case TypeIdentifier.NullableReferenceType:
                type = (f.type as NullableReferenceType).ref + "?";
                break;
              default:
                type = "";
                break;
            }
          }
          return {
            name: typeof (f.name) === "string" ? f.name : f.name.default,
            type: type,
          };
        }),
      };
    }),
  };
  return doc;
}
