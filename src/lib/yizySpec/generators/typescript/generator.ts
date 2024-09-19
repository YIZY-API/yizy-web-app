import { ProgrammingLanguage } from '$lib/models/constants';
import {
	type Service,
	TypeIdentifier,
	type DataType,
	type Endpoint,
	type NonPrimitiveType,
	type ObjectType,
	type NullableReferenceType,
	type ReferenceType,
	type NullableObjectType,
	type NullableArrayType,
	isObjectType,
	isArrayType,
	type ArrayType,
	isNullable,
	getLanguageSpecificName,
	type NameMap
} from '../../YIZYSpec';
import {
	MODEL_FILE_TEMPLATE,
	MODEL_TEMPLATE,
	POST_REQUEST_FUNCTION_TEMPLATE,
	type ModelFileTemplateInput,
	type ModelTemplateInput,
	type FieldTemplateInput,
	type PostRequestFunctionTemplateInput,
	type ClientSdkFileTemplateInput
} from './templates';
import Handlebars from 'handlebars';

function specTypeToNativeType(dataType: DataType): string {
	const typeMap = {
		float: 'number',
		'float?': 'number | null',
		double: 'number',
		'double?': 'number | null',
		string: 'string',
		'string?': 'string | null',
		boolean: 'boolean',
		'boolean?': 'boolean | null',
		int: 'number',
		'int?': 'number | null',
		int32: 'number',
		'int32?': 'number | null',
		int64: 'number',
		'int64?': 'number | null'
	};
	if (typeof dataType === 'string') {
		if (dataType in typeMap) {
			return typeMap[dataType];
		} else {
			return '';
		}
	} else {
		switch (dataType.type) {
			case TypeIdentifier.ObjectType:
				return typeof (dataType as ObjectType).name === 'string'
					? ((dataType as ObjectType).name as string)
					: getLanguageSpecificName(
							(dataType as ObjectType).name as NameMap,
							ProgrammingLanguage.Typescript
						);

			case TypeIdentifier.NullableObjectType:
				return typeof (dataType as NullableObjectType).name === 'string'
					? (((dataType as NullableObjectType).name + ' | null') as string)
					: getLanguageSpecificName(
							(dataType as NullableObjectType).name as NameMap,
							ProgrammingLanguage.Typescript
						) + ' |null';
			case TypeIdentifier.ReferenceType:
				return (dataType as ReferenceType).ref;
			case TypeIdentifier.NullableReferenceType:
				return (dataType as NullableReferenceType).ref + ' | null';
			case TypeIdentifier.ArrayType:
				if (isNullable((dataType as ArrayType).itemType)) {
					return '(' + specTypeToNativeType((dataType as ArrayType).itemType) + ')' + '[]';
				} else {
					return specTypeToNativeType((dataType as ArrayType).itemType) + '[]';
				}
			case TypeIdentifier.NullableArrayType:
				if (isNullable((dataType as NullableArrayType).itemType)) {
					return (
						'(' + specTypeToNativeType((dataType as NullableArrayType).itemType) + ')[] | null'
					);
				} else {
					return (
						'(' + specTypeToNativeType((dataType as NullableArrayType).itemType) + '[]) | null'
					);
				}
			default:
				return 'UNKNOWN TYPE!';
		}
	}
}

function nonPrimitiveTypeToModelTemplateInput(
	nonPrimitiveType: NonPrimitiveType
): ModelTemplateInput[] {
	let modelTemplateInputs: ModelTemplateInput[] = [];

	const fields: FieldTemplateInput[] = [];

	switch (nonPrimitiveType.type) {
		case TypeIdentifier.ObjectType:
			(nonPrimitiveType as ObjectType).fields.forEach((f) => {
				if (isObjectType(f.type)) {
					modelTemplateInputs = modelTemplateInputs.concat(
						nonPrimitiveTypeToModelTemplateInput(f.type as ObjectType)
					);
				}
				if (isArrayType(f.type)) {
					modelTemplateInputs = modelTemplateInputs.concat(
						nonPrimitiveTypeToModelTemplateInput(f.type as ObjectType)
					);
				}
				fields.push({
					name: typeof f.name === 'string' ? f.name : 'TODO',
					type: specTypeToNativeType(f.type)
				});
			});
			modelTemplateInputs.push({
				name:
					typeof (nonPrimitiveType as ObjectType).name === 'string'
						? ((nonPrimitiveType as ObjectType).name as string)
						: 'TODO',
				fields: fields
			});
			return modelTemplateInputs;
		case TypeIdentifier.ArrayType:
			if (isObjectType((nonPrimitiveType as ArrayType).itemType)) {
				modelTemplateInputs = modelTemplateInputs.concat(
					nonPrimitiveTypeToModelTemplateInput(
						(nonPrimitiveType as ArrayType).itemType as ObjectType
					)
				);
			}
			return modelTemplateInputs;
		default:
			return [];
	}
}

function serviceToModelFileTemplateInput(service: Service): ModelFileTemplateInput {
	const tmplInput: ModelFileTemplateInput = {
		models: []
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
	let stringRes = '';
	result.forEach((tmpl) => {
		stringRes += template(tmpl);
	});

	return stringRes;
}

function endpointToPostRequestFunctionTemplateInput(
	baseUrl: string,
	endpoint: Endpoint
): PostRequestFunctionTemplateInput {
	let argType = '';
	if (endpoint.requestModel?.type === TypeIdentifier.ReferenceType) {
		argType = (endpoint.requestModel as ReferenceType).ref;
	} else if (endpoint.requestModel?.type === TypeIdentifier.ObjectType) {
		argType =
			typeof (endpoint.requestModel as ObjectType).name === 'string'
				? ((endpoint.requestModel as ObjectType).name as string)
				: 'TODO';
	}

	let returnType = '';
	if (endpoint.responseModel?.type === TypeIdentifier.ReferenceType) {
		returnType = (endpoint.responseModel as ReferenceType).ref;
	} else if (endpoint.responseModel?.type === TypeIdentifier.ObjectType) {
		returnType =
			typeof (endpoint.responseModel as ObjectType).name === 'string'
				? ((endpoint.responseModel as ObjectType).name as string)
				: 'TODO';
	}

	return {
		functionName: typeof endpoint.name === 'string' ? endpoint.name : 'TODO',
		postUrl: baseUrl + endpoint.url,
		argType: argType,
		returnType: returnType
	};
}

function serviceToClientSdkTemplateInput(
	baseUrl: string,
	service: Service
): ClientSdkFileTemplateInput {
	const input: ClientSdkFileTemplateInput = {
		functions: []
	};
	service.endpoints.forEach((e: Endpoint) => {
		input.functions.push(endpointToPostRequestFunctionTemplateInput(baseUrl, e));
	});
	return input;
}

export function generatePostRequestFunction(baseUrl: string, endpoint: Endpoint): string {
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