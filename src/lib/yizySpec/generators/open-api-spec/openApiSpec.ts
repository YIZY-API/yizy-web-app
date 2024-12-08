import YAML from "yaml";
import * as YIZY from "@yizy/spec";

export enum OpenAPISpecType {
  JSON,
  YAML,
}

export function serviceToOpenApiSpec(
  service: YIZY.Service,
  outputType: OpenAPISpecType,
): string {
  const serviceName = typeof service.serviceName === "string"
    ? service.serviceName
    : (service.serviceName as YIZY.NameMap).default;
  const doc: OpenApiDoc = new OpenApiDoc(serviceName);
  doc.addServers(service.environment.flatMap((env) => env.url));

  service.endpoints.forEach((e: YIZY.Endpoint) => {
    let req: string | null;
    let res: string | null;
    if (!e.requestModel) {
      req = null;
    } else {
      req = typeof (e.requestModel as YIZY.ObjectType).name === "string"
        ? ((e.requestModel as YIZY.ObjectType).name as string)
        : ((e.requestModel as YIZY.ObjectType).name as YIZY.NameMap).default;
      const obj = e.requestModel as YIZY.ObjectType;
      doc.addComponent({
        name: typeof obj.name === "string"
          ? (obj.name as string)
          : (obj.name as YIZY.NameMap).default,
        properties: obj.fields,
      });
    }
    if (!e.responseModel) {
      res = null;
    } else {
      res = typeof (e.responseModel as YIZY.ObjectType).name === "string"
        ? ((e.responseModel as YIZY.ObjectType).name as string)
        : ((e.responseModel as YIZY.ObjectType).name as YIZY.NameMap).default;
      const obj = e.responseModel as YIZY.ObjectType;
      doc.addComponent({
        name: typeof obj.name === "string"
          ? (obj.name as string)
          : (obj.name as YIZY.NameMap).default,
        properties: obj.fields,
      });
    }

    doc.addPath({
      url: e.url,
      operationId: typeof e.name === "string"
        ? e.name
        : (e.name as YIZY.NameMap).default,
      requestRef: req,
      responseRef: res,
    });
  });

  service.referenceTypes.forEach((obj: YIZY.ObjectType) => {
    doc.addComponent({
      name: typeof obj.name === "string"
        ? (obj.name as string)
        : (obj.name as YIZY.NameMap).default,
      properties: obj.fields,
    });
  });

  return outputType === OpenAPISpecType.JSON ? doc.toJSON() : doc.toYAML();
}

export interface Doc {
  // eslint-disable-next-line
  [key: string]: any;
}

export interface AddPathDto {
  url: string;
  operationId: string;
  requestRef: string | null;
  responseRef: string | null;
}

export interface AddComponentDto {
  name: string;
  properties: YIZY.Field[];
}

export class OpenApiDoc {
  doc: Doc = {};

  constructor(title: string) {
    this.doc["openapi"] = "3.0.3";
    this.doc["info"] = {};
    this.doc["info"]["title"] = title;
    this.doc["info"]["description"] = "This is a generated API Spec";
    this.doc["info"]["version"] = "This is a generated API Spec";
    this.doc["servers"] = [];

    this.doc["paths"] = {};
    this.doc["components"] = {};
    this.doc["components"]["schemas"] = {};
  }

  addServers(urls: string[]) {
    urls.forEach((url: string) => {
      this.doc["servers"].push({
        url: url,
      });
    });
  }

  addPath(path: AddPathDto) {
    this.doc["paths"][path.url] = {};
    this.doc["paths"][path.url]["post"] = {};
    this.doc["paths"][path.url]["post"]["operationId"] = path.operationId;

    if (path.requestRef != null) {
      this.doc["paths"][path.url]["post"]["requestBody"] = {};
      this.doc["paths"][path.url]["post"]["requestBody"]["content"] = {};
      this
        .doc["paths"][path.url]["post"]["requestBody"]["content"][
          "application/json"
        ] = {};
      this
        .doc["paths"][path.url]["post"]["requestBody"]["content"][
          "application/json"
        ]["schema"] = {};

      this
        .doc["paths"][path.url]["post"]["requestBody"]["content"][
          "application/json"
        ]["schema"][
          "$ref"
        ] = "#/components/schemas/" + path.requestRef;
    }

    if (path.responseRef != null) {
      this.doc["paths"][path.url]["post"]["responses"] = {};
      this.doc["paths"][path.url]["post"]["responses"]["default"] = {};
      this.doc["paths"][path.url]["post"]["responses"]["default"]["content"] =
        {};
      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["content"][
          "application/json"
        ] = {};
      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["content"][
          "application/json"
        ][
          "schema"
        ] = {};

      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["content"][
          "application/json"
        ][
          "schema"
        ]["$ref"] = "#/components/schemas/" + path.responseRef;

      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["content"][
          "application/json"
        ][
          "schema"
        ]["$ref"] = "#/components/schemas/" + path.responseRef;

      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["description"] =
          "default response";
    } else {
      this.doc["paths"][path.url]["post"]["responses"] = {};
      this.doc["paths"][path.url]["post"]["responses"]["default"] = {};
      this
        .doc["paths"][path.url]["post"]["responses"]["default"]["description"] =
          "default response";
    }
  }

  addComponent(comp: AddComponentDto) {
    if (comp.name in this.doc["components"]["schemas"]) {
      throw new Error(comp.name + " is already added!");
    }

    this.doc["components"]["schemas"][comp.name] = {};
    this.doc["components"]["schemas"][comp.name]["type"] = "object";
    this.doc["components"]["schemas"][comp.name]["required"] = [];
    comp.properties.forEach((prop) => {
      this.doc["components"]["schemas"][comp.name]["required"].push(prop.name);
    });

    this.doc["components"]["schemas"][comp.name]["properties"] = {};
    comp.properties.forEach((prop) => {
      const obj = this.fieldDataTypeToProperty(prop.type);
      const n = typeof prop.name === "string"
        ? (prop.name as string)
        : (prop.name as YIZY.NameMap).default;
      this.doc["components"]["schemas"][comp.name]["properties"][n] = obj;
    });
  }

  private fieldDataTypeToProperty(type: YIZY.FieldDataType) {
    // eslint-disable-next-line
    const obj: any = {};
    if (YIZY.isNullable(type)) {
      obj["nullable"] = true;
    }
    if (YIZY.isPrimitiveType(type)) {
      switch (type) {
        case "string":
          obj["type"] = "string";
          break;
        case "string?":
          obj["type"] = "string";
          break;
        case "boolean":
          obj["type"] = "boolean";
          break;
        case "boolean?":
          obj["type"] = "boolean";
          break;
        case "int":
          obj["type"] = "integer";
          break;
        case "int?":
          obj["type"] = "integer";
          break;
        case "int32":
          obj["type"] = "integer";
          obj["format"] = "int32";
          break;
        case "int32?":
          obj["type"] = "integer";
          obj["format"] = "int32";
          break;
        case "int64":
          obj["type"] = "integer";
          obj["format"] = "int64";
          break;
        case "int64?":
          obj["type"] = "integer";
          obj["format"] = "int64";
          break;
        case "float":
          obj["type"] = "number";
          obj["format"] = "float";
          break;
        case "float?":
          obj["type"] = "number";
          obj["format"] = "float";
          break;
        case "double":
          obj["type"] = "number";
          obj["format"] = "double";
          break;
        case "double?":
          obj["type"] = "number";
          obj["format"] = "double";
          break;
        default:
          obj["type"] = type;
      }
    } else {
      if (YIZY.isArrayType(type) || YIZY.isNullableArrayType(type)) {
        obj["type"] = "array";
        obj["items"] = {};
        if (YIZY.isNullable(type)) {
          obj["items"] = this.fieldDataTypeToProperty(
            (type as YIZY.NullableArrayType).itemType,
          );
        } else {
          obj["items"] = this.fieldDataTypeToProperty(
            (type as YIZY.ArrayType).itemType,
          );
        }
      }
      if (YIZY.isRefType(type) || YIZY.isNullableRefType(type)) {
        if (YIZY.isNullable(type)) {
          obj["$ref"] = "#/components/schemas/" +
            (type as YIZY.NullableReferenceType).ref;
        } else {
          obj["$ref"] = "#/components/schemas/" +
            (type as YIZY.ReferenceType).ref;
        }
      }
    }
    return obj;
  }

  toJSON(): string {
    return JSON.stringify(this.doc, null, 4);
  }

  toYAML(): string {
    return YAML.stringify(this.doc, {
      indent: 4,
    });
  }
}
