import { ProgrammingLanguage } from "$lib/models/constants";
import {
  type ArrayType,
  type DataType,
  type Endpoint,
  getLanguageSpecificName,
  isNullable,
  isRefType,
  type NameMap,
  type NullableArrayType,
  type NullableObjectType,
  type NullableReferenceType,
  type ObjectType,
  type ReferenceType,
  type Service,
  TypeIdentifier,
} from "@yizy/spec";
import {
  type ClientSdkFileTemplateInput,
  type FieldTemplateInput,
  MODEL_FILE_TEMPLATE,
  MODEL_TEMPLATE,
  type ModelFileTemplateInput,
  type ModelTemplateInput,
  POST_REQUEST_FUNCTION_TEMPLATE,
  type PostRequestFunctionTemplateInput,
} from "./templates";
import Handlebars from "handlebars";

function specTypeToNativeType(dataType: DataType): string {
  const typeMap = {
    float: "number",
    "float?": "number | null",
    double: "number",
    "double?": "number | null",
    string: "string",
    "string?": "string | null",
    boolean: "boolean",
    "boolean?": "boolean | null",
    int: "number",
    "int?": "number | null",
    int32: "number",
    "int32?": "number | null",
    int64: "number",
    "int64?": "number | null",
  };
  if (typeof dataType === "string") {
    if (dataType in typeMap) {
      return typeMap[dataType];
    } else {
      return "";
    }
  } else {
    switch (dataType.type) {
      case TypeIdentifier.ObjectType:
        return typeof (dataType as ObjectType).name === "string"
          ? ((dataType as ObjectType).name as string)
          : getLanguageSpecificName(
            (dataType as ObjectType).name as NameMap,
            ProgrammingLanguage.Typescript,
          );

      case TypeIdentifier.NullableObjectType:
        return typeof (dataType as NullableObjectType).name === "string"
          ? (((dataType as NullableObjectType).name + " | null") as string)
          : getLanguageSpecificName(
            (dataType as NullableObjectType).name as NameMap,
            ProgrammingLanguage.Typescript,
          ) + " |null";
      case TypeIdentifier.ReferenceType:
        return (dataType as ReferenceType).ref;
      case TypeIdentifier.NullableReferenceType:
        return (dataType as NullableReferenceType).ref + " | null";
      case TypeIdentifier.ArrayType:
        if (isNullable((dataType as ArrayType).itemType)) {
          return "(" + specTypeToNativeType((dataType as ArrayType).itemType) +
            ")" + "[]";
        } else {
          return specTypeToNativeType((dataType as ArrayType).itemType) + "[]";
        }
      case TypeIdentifier.NullableArrayType:
        if (isNullable((dataType as NullableArrayType).itemType)) {
          return (
            "(" +
            specTypeToNativeType((dataType as NullableArrayType).itemType) +
            ")[] | null"
          );
        } else {
          return (
            "(" +
            specTypeToNativeType((dataType as NullableArrayType).itemType) +
            "[]) | null"
          );
        }
      default:
        return "UNKNOWN TYPE!";
    }
  }
}

function objectTypeToModelTemplateInput(obj: ObjectType): ModelTemplateInput[] {
  const modelTemplateInputs: ModelTemplateInput[] = [];
  const fields: FieldTemplateInput[] = [];

  obj.fields.forEach((f) => {
    fields.push({
      name: typeof f.name === "string" ? f.name : "TODO",
      type: specTypeToNativeType(f.type),
    });
  });

  modelTemplateInputs.push({
    name: typeof (obj as ObjectType).name === "string"
      ? ((obj as ObjectType).name as string)
      : "TODO",
    fields: fields,
  });
  return modelTemplateInputs;
}

function serviceToModelFileTemplateInput(
  service: Service,
): ModelFileTemplateInput {
  const tmplInput: ModelFileTemplateInput = {
    models: [],
  };

  service.referenceTypes.forEach((model: ObjectType) => {
    const res = objectTypeToModelTemplateInput(model);
    tmplInput.models = tmplInput.models.concat(res);
  });

  service.endpoints.forEach((endpoint: Endpoint) => {
    if (endpoint.requestModel != null) {
      if (!isRefType(endpoint.requestModel)) {
        const req = objectTypeToModelTemplateInput(
          endpoint.requestModel as ObjectType,
        );
        tmplInput.models = tmplInput.models.concat(req);
      }
    }

    if (endpoint.responseModel != null) {
      if (!isRefType(endpoint.responseModel)) {
        const res = objectTypeToModelTemplateInput(
          endpoint.responseModel as ObjectType,
        );
        tmplInput.models = tmplInput.models.concat(res);
      }
    }
  });

  return tmplInput;
}

export function generateModelFile(service: Service): string {
  const test: ModelFileTemplateInput = serviceToModelFileTemplateInput(service);
  const template = Handlebars.compile(MODEL_FILE_TEMPLATE);
  return template(test);
}

export function generateModelClass(object: ObjectType) {
  const result = objectTypeToModelTemplateInput(object);
  const template = Handlebars.compile(MODEL_TEMPLATE);
  let stringRes = "";
  result.forEach((tmpl) => {
    stringRes += template(tmpl);
  });

  return stringRes;
}

function endpointToPostRequestFunctionTemplateInput(
  baseUrl: string,
  endpoint: Endpoint,
): PostRequestFunctionTemplateInput {
  let argType = "";
  if (endpoint.requestModel?.type === TypeIdentifier.ReferenceType) {
    argType = (endpoint.requestModel as ReferenceType).ref;
  } else if (endpoint.requestModel?.type === TypeIdentifier.ObjectType) {
    argType = typeof (endpoint.requestModel as ObjectType).name === "string"
      ? ((endpoint.requestModel as ObjectType).name as string)
      : "TODO";
  }

  let returnType = "";
  if (endpoint.responseModel?.type === TypeIdentifier.ReferenceType) {
    returnType = (endpoint.responseModel as ReferenceType).ref;
  } else if (endpoint.responseModel?.type === TypeIdentifier.ObjectType) {
    returnType = typeof (endpoint.responseModel as ObjectType).name === "string"
      ? ((endpoint.responseModel as ObjectType).name as string)
      : "TODO";
  }

  return {
    functionName: typeof endpoint.name === "string" ? endpoint.name : "TODO",
    postUrl: baseUrl + endpoint.url,
    argType: argType,
    returnType: returnType,
  };
}

function serviceToClientSdkTemplateInput(
  baseUrl: string,
  service: Service,
): ClientSdkFileTemplateInput {
  const input: ClientSdkFileTemplateInput = {
    functions: [],
  };
  service.endpoints.forEach((e: Endpoint) => {
    input.functions.push(
      endpointToPostRequestFunctionTemplateInput(baseUrl, e),
    );
  });
  return input;
}

export function generatePostRequestFunction(
  baseUrl: string,
  endpoint: Endpoint,
): string {
  const input = endpointToPostRequestFunctionTemplateInput(baseUrl, endpoint);
  const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
  return tmpl(input);
}

export function generateSdkFile(baseUrl: string, service: Service): string {
  let result = generateModelFile(service);
  const templateInputs = serviceToClientSdkTemplateInput(baseUrl, service);

  templateInputs.functions.forEach((f) => {
    const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
    result = result + tmpl(f);
  });

  return result;
}
