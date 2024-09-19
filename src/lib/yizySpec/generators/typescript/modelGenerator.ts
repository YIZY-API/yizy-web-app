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
	type ModelFileTemplateInput,
	MODEL_FILE_TEMPLATE,
	type ModelTemplateInput,
	type FieldTemplateInput,
	MODEL_TEMPLATE
} from './modelTemplate';
import Handlebars from 'handlebars';

function stringify(dataType: DataType): string {
	const jsonToDatatypeStringMap = {
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
		if (dataType in jsonToDatatypeStringMap) {
			return jsonToDatatypeStringMap[dataType];
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
					return '(' + stringify((dataType as ArrayType).itemType) + ')' + '[]';
				} else {
					return stringify((dataType as ArrayType).itemType) + '[]';
				}
			case TypeIdentifier.NullableArrayType:
				if (isNullable((dataType as NullableArrayType).itemType)) {
					return '(' + stringify((dataType as NullableArrayType).itemType) + ')[] | null';
				} else {
					return '(' + stringify((dataType as NullableArrayType).itemType) + '[]) | null';
				}
			default:
				return 'UNKNOWN TYPE!';
		}
	}
}

function convertDataTypeToModelTemplates(nonPrimitiveType: NonPrimitiveType): ModelTemplateInput[] {
	let modelTemplateInputs: ModelTemplateInput[] = [];

	const fields: FieldTemplateInput[] = [];

	switch (nonPrimitiveType.type) {
		case TypeIdentifier.ObjectType:
			(nonPrimitiveType as ObjectType).fields.forEach((f) => {
				if (isObjectType(f.type)) {
					modelTemplateInputs = modelTemplateInputs.concat(
						convertDataTypeToModelTemplates(f.type as ObjectType)
					);
				}
				if (isArrayType(f.type)) {
					modelTemplateInputs = modelTemplateInputs.concat(
						convertDataTypeToModelTemplates(f.type as ObjectType)
					);
				}
				fields.push({
					name: typeof f.name === 'string' ? f.name : 'TODO',
					type: stringify(f.type)
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
					convertDataTypeToModelTemplates((nonPrimitiveType as ArrayType).itemType as ObjectType)
				);
			}
			return modelTemplateInputs;
		default:
			return [];
	}
}

function convertServiceToTemplate(service: Service): ModelFileTemplateInput {
	const tmplInput: ModelFileTemplateInput = {
		models: []
	};

	service.referenceTypes.forEach((model: ObjectType) => {
		const res = convertDataTypeToModelTemplates(model);
		tmplInput.models = tmplInput.models.concat(res);
	});

	service.endpoints.forEach((endpoint: Endpoint) => {
		if (endpoint.requestModel != null) {
			const req = convertDataTypeToModelTemplates(endpoint.requestModel);
			tmplInput.models = tmplInput.models.concat(req);
		}

		if (endpoint.responseModel != null) {
			const res = convertDataTypeToModelTemplates(endpoint.responseModel);
			tmplInput.models = tmplInput.models.concat(res);
		}
	});

	return tmplInput;
}

export function generateModelFile(service: Service): string {
	const test: ModelFileTemplateInput = convertServiceToTemplate(service);
	const template = Handlebars.compile(MODEL_FILE_TEMPLATE);
	return template(test);
}

export function generateModelClass(object: ObjectType) {
	const result = convertDataTypeToModelTemplates(object);
	const template = Handlebars.compile(MODEL_TEMPLATE);
	let stringRes = '';
	result.forEach((tmpl) => {
		stringRes += template(tmpl);
	});

	return stringRes;
}
