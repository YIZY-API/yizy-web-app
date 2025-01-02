import {
  type ArrayType,
  type DataType,
  type Endpoint,
  isArrayType,
  isObjectType,
  type NonPrimitiveType,
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
  const jsonToPhpStringMap = {
    float: "float",
    "float?": "?float",
    double: "?float",
    "double?": "?float",
    string: "string",
    "string?": "?string",
    boolean: "bool",
    "boolean?": "bool",
    int: "int",
    "int?": "?int",
    int32: "int",
    "int32?": "?int",
    int64: "int",
    "int64?": "?int",
  };
  if (typeof dataType === "string") {
    if (dataType in jsonToPhpStringMap) {
      return jsonToPhpStringMap[dataType];
    } else {
      return "TODO";
    }
  } else {
    switch (dataType.type) {
      case TypeIdentifier.ObjectType:
        return typeof (dataType as ObjectType).name === "string"
          ? ((dataType as ObjectType).name as string)
          : "TODO";

      case TypeIdentifier.NullableObjectType:
        return typeof (dataType as NullableObjectType).name === "string"
          ? (("?" + (dataType as NullableObjectType).name) as string)
          : "TODO";
      case TypeIdentifier.ReferenceType:
        return (dataType as ReferenceType).ref;
      case TypeIdentifier.NullableReferenceType:
        return "?" + (dataType as NullableReferenceType).ref;
      case TypeIdentifier.ArrayType:
        return specTypeToNativeType((dataType as ArrayType).itemType) + "[]";
      case TypeIdentifier.NullableArrayType:
        return "?" + specTypeToNativeType((dataType as ArrayType).itemType) +
          "[]";
      default:
        return "TODO";
    }
  }
}

function nonPrimitiveTypeToModelTemplateInput(
  nonPrimitiveType: NonPrimitiveType,
): ModelTemplateInput[] {
  let modelTemplateInputs: ModelTemplateInput[] = [];

  const fields: FieldTemplateInput[] = [];

  switch (nonPrimitiveType.type) {
    case TypeIdentifier.ObjectType:
      (nonPrimitiveType as ObjectType).fields.forEach((f) => {
        if (isObjectType(f.type)) {
          modelTemplateInputs = modelTemplateInputs.concat(
            nonPrimitiveTypeToModelTemplateInput(f.type as NonPrimitiveType),
          );
        }
        if (isArrayType(f.type)) {
          modelTemplateInputs = modelTemplateInputs.concat(
            nonPrimitiveTypeToModelTemplateInput(f.type as NonPrimitiveType),
          );
        }
        if (isArrayType(f.type)) {
          fields.push({
            name: typeof f.name === "string" ? f.name : "TODO",
            type: "",
            phpDocType: specTypeToNativeType(f.type),
          });
        } else {
          fields.push({
            name: typeof f.name === "string" ? f.name : "TODO",
            type: specTypeToNativeType(f.type),
            phpDocType: "",
          });
        }
      });
      modelTemplateInputs.push({
        name: typeof (nonPrimitiveType as ObjectType).name === "string"
          ? ((nonPrimitiveType as ObjectType).name as string)
          : "TODO",
        fields: fields,
      });
      return modelTemplateInputs;
    case TypeIdentifier.ArrayType:
      if (isObjectType((nonPrimitiveType as ArrayType).itemType)) {
        modelTemplateInputs = modelTemplateInputs.concat(
          nonPrimitiveTypeToModelTemplateInput(
            (nonPrimitiveType as ArrayType).itemType as NonPrimitiveType,
          ),
        );
      }
      return modelTemplateInputs;
    default:
      return [];
  }
}

function serviceToModelFileTemplateInput(
  service: Service,
): ModelFileTemplateInput {
  const tmplInput: ModelFileTemplateInput = {
    models: [],
  };

  service.referenceTypes.forEach((model: ObjectType) => {
    const res = nonPrimitiveTypeToModelTemplateInput(model);
    tmplInput.models = tmplInput.models.concat(res);
  });

  service.endpoints.forEach((endpoint: Endpoint) => {
    if (endpoint.requestModel != null) {
      const req = nonPrimitiveTypeToModelTemplateInput(endpoint.requestModel);
      tmplInput.models = tmplInput.models.concat(req);
    }

    if (endpoint.responseModel != null) {
      const res = nonPrimitiveTypeToModelTemplateInput(endpoint.responseModel);
      tmplInput.models = tmplInput.models.concat(res);
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
  const result = nonPrimitiveTypeToModelTemplateInput(object);
  const template = Handlebars.compile(MODEL_TEMPLATE);
  let stringRes = "";
  result.forEach((tmpl) => {
    stringRes += template(tmpl);
  });

  return stringRes;
}

function endpointToPostRequestFunctionTemplateInput(
  endpoint: Endpoint,
): PostRequestFunctionTemplateInput {
  let argType = "";
  if (endpoint.requestModel?.type === TypeIdentifier.ObjectType) {
    argType = typeof (endpoint.requestModel as ObjectType).name === "string"
      ? ((endpoint.requestModel as ObjectType).name as string)
      : "TODO";
  }

  let returnType = "";
  if (endpoint.responseModel?.type === TypeIdentifier.ObjectType) {
    returnType = typeof (endpoint.responseModel as ObjectType).name === "string"
      ? ((endpoint.responseModel as ObjectType).name as string)
      : "TODO";
  }

  return {
    functionName: typeof endpoint.name === "string" ? endpoint.name : "TODO",
    postUrl: endpoint.url,
    argType: argType,
    returnType: returnType,
  };
}

function serviceToClientSdkFileTemplateInput(
  service: Service,
): ClientSdkFileTemplateInput {
  const input: ClientSdkFileTemplateInput = {
    functions: [],
  };
  service.endpoints.forEach((e: Endpoint) => {
    input.functions.push(
      endpointToPostRequestFunctionTemplateInput(e),
    );
  });
  return input;
}

export function generateFunction(endpoint: Endpoint): string {
  const input = endpointToPostRequestFunctionTemplateInput(endpoint);
  const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
  return tmpl(input);
}

export function generateSdkFile(service: Service): string {
  let result = generateModelFile(service);
  const templateInputs = serviceToClientSdkFileTemplateInput(service);

  templateInputs.functions.forEach((f) => {
    const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
    result = result + tmpl(f);
  });

  return result;
}
