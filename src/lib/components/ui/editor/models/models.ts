//import {
//  type ArrayType,
//  arrayType,
//  type DataType,
//  type Field as YizyField,
//  type FieldDataType,
//  isPrimitiveType,
//  type NullableArrayType,
//  nullableArrayType,
//  type NullableReferenceType,
//  nullableReferenceType,
//  type ObjectType,
//  objectType,
//  type PrimitiveTypes,
//  type ReferenceType,
//  type Service,
//  TypeIdentifier,
//} from "@yizy/spec";
import * as yizy from "@yizy/spec";

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
  req: Model | null;
  res: Model | null;
}

export interface Model {
  name: string;
  fields: Field[];
}
export interface Field {
  name: string;
  type: string;
}

function docFieldToServiceField(f: Field): yizy.Field {
  return {
    name: f.name,
    type: docTypeToServiceType(f.type),
  };

  // int[]? -> nullableArray(int)
  // int?[]? -> nullaleArray(int?)
  // object[]?
  // object?
  // object?[]?
  //
  // int[] -> array(int)
  // int?[] -> array(int?)
  // object
  // object[]
  // object?[]
  // int[][]
  //
}

function docTypeToServiceType(t: string): yizy.FieldDataType {
  if (yizy.isPrimitiveType(t as yizy.DataType)) {
    return t as yizy.PrimitiveTypes;
  } else {
    if (t.slice(-1) == "?") {
      if (t.slice(-2) == "]") {
        return yizy.nullableArrayType(
          docTypeToServiceType(t.substring(0, t.length - 2)),
        );
      } else {
        return yizy.nullableReferenceType(t.substring(0, t.length - 1));
      }
    } else if (t.slice(-1) == "]") {
      return yizy.arrayType(docTypeToServiceType(t.substring(0, t.length - 2)));
    } else {
      return yizy.referenceType(t);
    }
  }
}

export function docToYizySpec(doc: Document): yizy.Service {
  const service: yizy.Service = {
    serviceName: doc.name,
    description: doc.description,
    environment: doc.environment.map((e) => {
      return {
        name: e.name,
        url: e.baseUrl,
      };
    }),
    endpoints: doc.endpoints.map((e) => {
      const endpoint: yizy.Endpoint = {
        name: e.name,
        description: e.description,
        url: e.url,
        requestModel: e.req === null ? null : yizy.objectType(
          e.req.name,
          e.req.fields.map((f) => docFieldToServiceField(f)),
        ),
        responseModel: e.res === null ? null : yizy.objectType(
          e.res.name,
          e.res.fields.map((f) => docFieldToServiceField(f)),
        ),
      };
      return endpoint;
    }),
    referenceTypes: doc.additionalModels.map((m) => {
      const obj: yizy.ObjectType = yizy.objectType(
        m.name,
        m.fields.map((f) => docFieldToServiceField(f)),
      );
      return obj;
    }),
  };

  return service;
}

export function yizySpecToDoc(service: yizy.Service): Document {
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
      const endpoint: Endpoint = {
        name: typeof (e.name) === "string" ? e.name : e.name.default,
        url: e.url,
        description: e.description,
        req: e.requestModel === null ? null : {
          name: typeof (e.requestModel.name) === "string"
            ? e.requestModel.name
            : e.requestModel.name.default,
          fields: e.requestModel.fields.map((f) => {
            let type = "";
            if (typeof f.type === "string") {
              type = f.type as yizy.PrimitiveTypes;
            } else {
              switch (f.type.type) {
                case yizy.TypeIdentifier.ArrayType:
                  type = (f.type as yizy.ArrayType).itemType + "[]";
                  break;
                case yizy.TypeIdentifier.NullableArrayType:
                  type = (f.type as yizy.NullableArrayType).itemType + "[]?";
                  break;
                case yizy.TypeIdentifier.ReferenceType:
                  type = (f.type as yizy.ReferenceType).ref;
                  break;
                case yizy.TypeIdentifier.NullableReferenceType:
                  type = (f.type as yizy.NullableReferenceType).ref + "?";
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
        },
        res: e.responseModel === null ? null : {
          name: typeof (e.responseModel.name) === "string"
            ? e.responseModel.name
            : e.responseModel.name.default,
          fields: e.responseModel.fields.map((f) => {
            let type = "";
            if (typeof f.type === "string") {
              type = f.type as yizy.PrimitiveTypes;
            } else {
              switch (f.type.type) {
                case yizy.TypeIdentifier.ArrayType:
                  type = (f.type as yizy.ArrayType).itemType + "[]";
                  break;
                case yizy.TypeIdentifier.NullableArrayType:
                  type = (f.type as yizy.NullableArrayType).itemType + "[]?";
                  break;
                case yizy.TypeIdentifier.ReferenceType:
                  type = (f.type as yizy.ReferenceType).ref;
                  break;
                case yizy.TypeIdentifier.NullableReferenceType:
                  type = (f.type as yizy.NullableReferenceType).ref + "?";
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
        },
      };
      return endpoint;
    }),
    additionalModels: service.referenceTypes.map((t) => {
      return {
        name: typeof (t.name) === "string" ? t.name : t.name.default,
        fields: t.fields.map((f) => {
          let type = "";

          if (typeof f.type === "string") {
            type = f.type as yizy.PrimitiveTypes;
          } else {
            switch (f.type.type) {
              case yizy.TypeIdentifier.ArrayType:
                type = (f.type as yizy.ArrayType).itemType + "[]";
                break;
              case yizy.TypeIdentifier.NullableArrayType:
                type = (f.type as yizy.NullableArrayType).itemType + "[]?";
                break;
              case yizy.TypeIdentifier.ReferenceType:
                type = (f.type as yizy.ReferenceType).ref;
                break;
              case yizy.TypeIdentifier.NullableReferenceType:
                type = (f.type as yizy.NullableReferenceType).ref + "?";
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
