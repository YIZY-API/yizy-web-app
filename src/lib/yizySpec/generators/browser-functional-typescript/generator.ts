import { ProgrammingLanguage } from "$lib/models/constants";
import { generatorWarning, getGeneratorComments } from "../constants";
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
  HOOKS_AND_CONFIGS_TEMPLATE,
  type HooksAndConfigsTemplateInput,
  MODEL_FILE_TEMPLATE,
  MODEL_TEMPLATE,
  type ModelFileTemplateInput,
  type ModelTemplateInput,
  POST_REQUEST_FUNCTION_TEMPLATE,
  type PostRequestFunctionTemplateInput,
  type Route,
  SERVICE_ROUTE_TEMPLATE,
  type ServiceRouteTemplateInput,
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
  serviceName: string,
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
    serviceName: serviceName,
  };
}

function serviceToClientSdkTemplateInput(
  service: Service,
): ClientSdkFileTemplateInput {
  const input: ClientSdkFileTemplateInput = {
    functions: [],
  };
  service.endpoints.forEach((e: Endpoint) => {
    input.functions.push(
      endpointToPostRequestFunctionTemplateInput(
        typeof service.serviceName == "string"
          ? service.serviceName as string
          : (service.serviceName as NameMap).default,
        e,
      ),
    );
  });
  return input;
}

export function generatePostRequestFunction(
  serviceName: string,
  endpoint: Endpoint,
): string {
  const input = endpointToPostRequestFunctionTemplateInput(
    serviceName,
    endpoint,
  );
  const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
  return tmpl(input);
}

export function generateRoute(service: Service): string {
  const routes: Route[] = service.endpoints.flatMap((e: Endpoint) => {
    const route: Route = {
      name: typeof e.name === "string" ? e.name : (e.name as NameMap).default,
      url: e.url,
    };
    return route;
  });
  const tmplInput: ServiceRouteTemplateInput = {
    serviceName: typeof service.serviceName === "string"
      ? service.serviceName
      : (service.serviceName as NameMap).default,
    routes: routes,
  };

  const tmpl = Handlebars.compile(SERVICE_ROUTE_TEMPLATE);
  return tmpl(tmplInput);
}

function generateConfigsAndHooks(service: Service): string {
  const tmplInput: HooksAndConfigsTemplateInput = {
    serviceName: typeof (service.serviceName) === "string"
      ? service.serviceName as string
      : (service.serviceName as NameMap).default,
    environments: service.environment.map((e) => {
      return {
        baseUrl: e.url,
        name: e.name,
      };
    }),
  };

  const tmpl = Handlebars.compile(HOOKS_AND_CONFIGS_TEMPLATE);
  const result = tmpl(tmplInput);
  return result;
}

export function generateServerCode(service: Service, version?: string): string {
  const routes = generateRoute(service);
  const result = generateModelFile(service);
  if (version) {
    const servicename = typeof service.serviceName === "string"
      ? service.serviceName
      : (service.serviceName as NameMap).default;
    return getGeneratorComments(version, servicename) + routes + result;
  } else {
    return generatorWarning + routes + result;
  }
}

export function generateSdkFile(service: Service, version?: string): string {
  let result = generateModelFile(service);
  result = result + generateConfigsAndHooks(service);
  const templateInputs = serviceToClientSdkTemplateInput(service);
  templateInputs.functions.forEach((f) => {
    const tmpl = Handlebars.compile(POST_REQUEST_FUNCTION_TEMPLATE);
    result = result + tmpl(f);
  });
  if (version) {
    const servicename = typeof service.serviceName === "string"
      ? service.serviceName
      : (service.serviceName as NameMap).default;
    return getGeneratorComments(version, servicename) + result;
  } else {
    return generatorWarning + result;
  }
}
