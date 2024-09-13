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
	isObjectType
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
	const jsonToPhpStringMap = {
		float: 'float',
		'float?': '?float',
		double: '?float',
		'double?': '?float',
		string: 'string',
		'string?': '?string',
		boolean: 'bool',
		'boolean?': 'bool',
		int: 'int',
		'int?': '?int',
		int32: 'int',
		'int32?': '?int',
		int64: 'int',
		'int64?': '?int'
	};
	if (typeof dataType === 'string') {
		if (dataType in jsonToPhpStringMap) {
			return jsonToPhpStringMap[dataType];
		} else {
			return 'TODO';
		}
	} else {
		switch (dataType.type) {
			case TypeIdentifier.ObjectType:
				return typeof (dataType as ObjectType).name === 'string'
					? ((dataType as ObjectType).name as string)
					: 'TODO';

			case TypeIdentifier.NullableObjectType:
				return typeof (dataType as NullableObjectType).name === 'string'
					? (('?' + (dataType as NullableObjectType).name) as string)
					: 'TODO';
			case TypeIdentifier.ReferenceType:
				return (dataType as ReferenceType).ref;
			case TypeIdentifier.NullableReferenceType:
				return '?' + (dataType as NullableReferenceType).ref;
			case TypeIdentifier.ArrayType:
				return 'array';
			case TypeIdentifier.NullableArrayType:
				return '?array';
			default:
				return 'TODO';
		}
	}
}

function convertDataTypeToModelTemplates(dataType: DataType): ModelTemplateInput[] {
	if (typeof dataType === 'string') {
		//primative type
		return [
			{
				name: 'TODO',
				fields: []
			}
		];
	} else {
		let modelTemplateInputs: ModelTemplateInput[] = [];

		const nonPrimitiveType = dataType as NonPrimitiveType;
		const fields: FieldTemplateInput[] = [];

		switch (nonPrimitiveType.type) {
			case TypeIdentifier.ObjectType:
				(dataType as ObjectType).fields.forEach((f) => {
					if (isObjectType(f.type)) {
						modelTemplateInputs = modelTemplateInputs.concat(
							convertDataTypeToModelTemplates(f.type)
						);
					}
					fields.push({
						name: typeof f.name === 'string' ? f.name : 'TODO',
						type: stringify(f.type)
					});
				});
				modelTemplateInputs.push({
					name:
						typeof (dataType as ObjectType).name === 'string'
							? ((dataType as ObjectType).name as string)
							: 'TODO',
					fields: fields
				});
				return modelTemplateInputs;
			default:
				return [
					{
						name: 'TODO',
						fields: []
					}
				];
		}
	}
}

function convertServiceToTemplate(service: Service): ModelFileTemplateInput {
	const tmplInput: ModelFileTemplateInput = {
		models: []
	};

	service.referenceTypes.forEach((model: DataType) => {
		const res = convertDataTypeToModelTemplates(model);
		tmplInput.models = tmplInput.models.concat(res);
	});

	service.endpoints.forEach((endpoint: Endpoint) => {
		const req = convertDataTypeToModelTemplates(endpoint.requestModel);
		tmplInput.models = tmplInput.models.concat(req);

		const res = convertDataTypeToModelTemplates(endpoint.responseModel);
		tmplInput.models = tmplInput.models.concat(res);
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
