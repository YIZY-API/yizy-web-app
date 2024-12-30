import { ProgrammingLanguage } from "$lib/models/constants";
import * as yizy from "@yizy/spec";

export interface Document {
  name: string;
  environment: Environment[];
  description: string;
  endpoints: Endpoint[];
  additionalModels: Model[];
}

export const DEFAULT_DOCUMENT: Document = {
  name: "",
  description: "",
  environment: [
    {
      name: "",
      baseUrl: "",
    },
  ],
  endpoints: [
    {
      name: "",
      url: "",
      description: "",
      req: {
        name: "",
        fields: [
          {
            name: "",
            type: "",
          },
        ],
      },
      res: {
        name: "",
        fields: [
          {
            name: "",
            type: "",
          },
        ],
      },
    },
  ],
  additionalModels: [
    {
      name: "",
      fields: [
        {
          name: "",
          type: "",
        },
      ],
    },
  ],
};

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

function specTypeToNativeType(dataType: yizy.DataType): string {
  const typeMap = {
    float: "float",
    "float?": "float?",
    double: "double",
    "double?": "double?",
    string: "string",
    "string?": "string?",
    boolean: "boolean",
    "boolean?": "boolean?",
    int: "int",
    "int?": "int?",
    int32: "int32",
    "int32?": "int32?",
    int64: "int64",
    "int64?": "int64?",
  };
  if (typeof dataType === "string") {
    if (dataType in typeMap) {
      return typeMap[dataType];
    } else {
      return "";
    }
  } else {
    switch (dataType.type) {
      case yizy.TypeIdentifier.ObjectType:
        return typeof (dataType as yizy.ObjectType).name === "string"
          ? ((dataType as yizy.ObjectType).name as string)
          : yizy.getLanguageSpecificName(
            (dataType as yizy.ObjectType).name as yizy.NameMap,
            ProgrammingLanguage.Typescript,
          );

      case yizy.TypeIdentifier.NullableObjectType:
        return typeof (dataType as yizy.NullableObjectType).name === "string"
          ? (((dataType as yizy.NullableObjectType).name + "?") as string)
          : yizy.getLanguageSpecificName(
            (dataType as yizy.NullableObjectType).name as yizy.NameMap,
            ProgrammingLanguage.Typescript,
          ) + "?";
      case yizy.TypeIdentifier.ReferenceType:
        return (dataType as yizy.ReferenceType).ref;
      case yizy.TypeIdentifier.NullableReferenceType:
        return (dataType as yizy.NullableReferenceType).ref + "?";
      case yizy.TypeIdentifier.ArrayType:
        if (yizy.isNullable((dataType as yizy.ArrayType).itemType)) {
          return "(" +
            specTypeToNativeType((dataType as yizy.ArrayType).itemType) +
            ")" + "[]";
        } else {
          return specTypeToNativeType((dataType as yizy.ArrayType).itemType) +
            "[]";
        }
      case yizy.TypeIdentifier.NullableArrayType:
        if (yizy.isNullable((dataType as yizy.NullableArrayType).itemType)) {
          return (
            "(" +
            specTypeToNativeType(
              (dataType as yizy.NullableArrayType).itemType,
            ) +
            ")[]?"
          );
        } else {
          return (
            "(" +
            specTypeToNativeType(
              (dataType as yizy.NullableArrayType).itemType,
            ) +
            "[])?"
          );
        }
      default:
        return "UNKNOWN TYPE!";
    }
  }
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
            const type = specTypeToNativeType(f.type);
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
            const type = specTypeToNativeType(f.type);
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
        fields: t.fields.map((f: yizy.Field) => {
          const type = specTypeToNativeType(f.type);
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
