import {
	type Service,
	type Endpoint,
	TypeIdentifier,
	type ReferenceType,
	type ObjectType
} from '../../YIZYSpec';
import { generateModelFile } from './modelGenerator';
import {
	type SdkFileTemplateInput,
	type FunctionTemplateInput,
	FUNCTION_TEMPLATE
} from './sdkTemplate';
import Handlebars from 'handlebars';

function convertEndpointToTemplateInput(
	baseUrl: string,
	endpoint: Endpoint
): FunctionTemplateInput {
	let argType = '';
	if (endpoint.requestModel.type === TypeIdentifier.ReferenceType) {
		argType = (endpoint.requestModel as ReferenceType).ref;
	} else {
		argType =
			typeof (endpoint.requestModel as ObjectType).name === 'string'
				? ((endpoint.requestModel as ObjectType).name as string)
				: 'TODO';
	}

	let returnType = '';
	if (endpoint.responseModel.type === TypeIdentifier.ReferenceType) {
		returnType = (endpoint.responseModel as ReferenceType).ref;
	} else {
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

function convertServiceToTemplateInput(baseUrl: string, service: Service): SdkFileTemplateInput {
	const input: SdkFileTemplateInput = {
		functions: []
	};
	service.endpoints.forEach((e: Endpoint) => {
		input.functions.push(convertEndpointToTemplateInput(baseUrl, e));
	});
	return input;
}

export function generateFunction(baseUrl: string, endpoint: Endpoint): string {
	const input = convertEndpointToTemplateInput(baseUrl, endpoint);
	const tmpl = Handlebars.compile(FUNCTION_TEMPLATE);
	console.log(tmpl(input));
	return tmpl(input);
}

export function generateSdkFile(baseUrl: string, service: Service): string {
	let result = generateModelFile(service);
	const templateInputs = convertServiceToTemplateInput(baseUrl, service);

	templateInputs.functions.forEach((f) => {
		const tmpl = Handlebars.compile(FUNCTION_TEMPLATE);
		result = result + tmpl(f);
	});

	return result;
}
