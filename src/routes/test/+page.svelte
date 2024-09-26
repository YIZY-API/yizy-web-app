<script lang="ts">
	import { testService } from '$lib/yizySpec/examples/testSpec';
	import * as oapi from '../../lib/yizySpec/generators/open-api-spec/openApiSpec';

	console.log(oapi.serviceToOpenApiSpec(testService, oapi.OpenAPISpecType.JSON));
	//import { TypeIdentifier } from '$lib/yizySpec/YIZYSpec';
	//import {
	//	type HeadTemplate,
	//	OPEN_API_COMPONENTS_TEMPLATE,
	//	OPEN_API_HEAD_TEMPLATE,
	//	OPEN_API_PATHS_TEMPLATE,
	//	//type PathTemplateInput,
	//	type PathsTemplateInput,
	//	type ComponentTemplateInput,
	//	type Component,
	//	type Field,
	//	isOpenAPIPrimitiveType,
	//	isOpenAPIRefType,
	//	isOpenAPINullableRefType,
	//	isOpenAPIArrayType,
	//	isOpenAPINullableArrayType,
	//	isOpenAPIObjectType,
	//	isOpenAPINullableObjectType,
	//	fieldToSpec
	//} from '../../lib/yizySpec/generators/open-api-spec/templates';
	//import Handlebars from 'handlebars';

	//const tmpl = Handlebars.compile(OPEN_API_HEAD_TEMPLATE);
	//const input: HeadTemplate = {
	//	title: 'test service',
	//	urls: ['hello', 'bye']
	//};
	//const s1 = tmpl(input);

	//const pathTmpl = Handlebars.compile(OPEN_API_PATHS_TEMPLATE);
	//const pathInput: PathsTemplateInput = {
	//	paths: [
	//		{
	//			operationId: 'getSomething',
	//			path: '/getSomething',
	//			requestName: 'GetSomethingRequest',
	//			responseName: 'GetSomethingResponse'
	//		},
	//		{
	//			operationId: 'getSomethingElse',
	//			path: '/getSomethingElse',
	//			requestName: 'GetSomethingElseRequest',
	//			responseName: 'GetSomethingElseResponse'
	//		}
	//	]
	//};

	//const s2 = pathTmpl(pathInput);

	////Handlebars.registerHelper('isPrimitiveType', isOpenAPIPrimitiveType);
	////Handlebars.registerHelper('isObjectType', isOpenAPIObjectType);
	////Handlebars.registerHelper('isNullableObjectType', isOpenAPINullableObjectType);
	////Handlebars.registerHelper('isArrayType', isOpenAPIArrayType);
	////Handlebars.registerHelper('isNullableArrayType', isOpenAPINullableArrayType);
	////Handlebars.registerHelper('isRefType', isOpenAPIRefType);
	////Handlebars.registerHelper('isNullableRefType', isOpenAPINullableRefType);
	//Handlebars.registerHelper('fieldToSpec', fieldToSpec);

	//const compTepl = Handlebars.compile(OPEN_API_COMPONENTS_TEMPLATE);
	//const compInput: ComponentTemplateInput = {
	//	components: [
	//		{
	//			name: 'TestObject',
	//			fields: [
	//				{
	//					name: 'stringField',
	//					type: 'string'
	//				},
	//				{
	//					name: 'nullableStringField',
	//					type: 'string?'
	//				},
	//				{
	//					name: 'intField',
	//					type: 'int'
	//				},
	//				{
	//					name: 'nullableIntField',
	//					type: 'int?'
	//				},
	//				{
	//					name: 'int32Field',
	//					type: 'int32'
	//				},
	//				{
	//					name: 'nullableInt32Field',
	//					type: 'int32?'
	//				},
	//				{
	//					name: 'int64Field',
	//					type: 'int64'
	//				},
	//				{
	//					name: 'nullableInt64Field',
	//					type: 'int64?'
	//				},
	//				{
	//					name: 'floatField',
	//					type: 'float'
	//				},
	//				{
	//					name: 'nullableFloatField',
	//					type: 'float?'
	//				},
	//				{
	//					name: 'doubleField',
	//					type: 'double'
	//				},
	//				{
	//					name: 'nullableDoubleField',
	//					type: 'double?'
	//				},
	//				{
	//					name: 'boolField',
	//					type: 'boolean'
	//				},
	//				{
	//					name: 'nullableBool',
	//					type: 'boolean?'
	//				}
	//			]
	//		},
	//		{
	//			name: 'GetSomethingRequest',
	//			fields: [
	//				{
	//					name: 'test',
	//					type: 'string'
	//				}
	//			]
	//		},
	//		{
	//			name: 'GetSomethingResponse',
	//			fields: [
	//				{
	//					name: 'test',
	//					type: 'string'
	//				}
	//			]
	//		},
	//		{
	//			name: 'GetSomethingElseRequest',
	//			fields: [
	//				{
	//					name: 'test',
	//					type: 'string'
	//				}
	//			]
	//		},
	//		{
	//			name: 'GetSomethingElseResponse',
	//			fields: [
	//				{
	//					name: 'test',
	//					type: 'string'
	//				}
	//			]
	//		}
	//	]
	//};

	//const s3 = compTepl(compInput);

	//console.log(s1 + s2 + s3);

	//let doc: oapi.OpenApiDoc = new oapi.OpenApiDoc('TestService');
	//doc.addServers(['https://test.com', 'http://localhost:8080']);
	//doc.addPath({
	//	name: '/api/getExample',
	//	operationId: 'getExample',
	//	requestRef: 'GetExampleRequest',
	//	responseRef: 'GetExampleResponse'
	//});
	//doc.addComponent({
	//	name: 'GetExampleRequest',
	//	properties: [
	//		{
	//			name: 'input',
	//			type: 'string'
	//		}
	//	]
	//});

	//doc.addComponent({
	//	name: 'GetExampleResponse',
	//	properties: [
	//		{
	//			name: 'output',
	//			type: 'string'
	//		}
	//	]
	//});

	//doc.addPath({
	//	name: '/api/demo',
	//	operationId: 'DemoEndpoint',
	//	requestRef: 'DemoRequest',
	//	responseRef: 'DemoResponse'
	//});

	//doc.addComponent({
	//	name: 'DemoRequest',
	//	properties: [
	//		{
	//			name: 'stringField',
	//			type: 'string'
	//		},
	//		{
	//			name: 'nullableStringField',
	//			type: 'string?'
	//		},
	//		{
	//			name: 'int',
	//			type: 'int'
	//		},
	//		{
	//			name: 'nullableInt',
	//			type: 'int?'
	//		},
	//		{
	//			name: 'int32Field',
	//			type: 'int32'
	//		},
	//		{
	//			name: 'floatField',
	//			type: 'float'
	//		},
	//		{
	//			name: 'ramdomObj',
	//			type: {
	//				type: TypeIdentifier.ReferenceType,
	//				ref: 'SomeObject'
	//			}
	//		},
	//		{
	//			name: 'arrayOfString',
	//			type: {
	//				type: TypeIdentifier.ArrayType,
	//				itemType: 'string'
	//			}
	//		},
	//		{
	//			name: 'arrayOfObj',
	//			type: {
	//				type: TypeIdentifier.ReferenceType,
	//				ref: 'SomeObject'
	//			}
	//		}
	//	]
	//});
	//doc.addComponent({
	//	name: 'DemoResponse',
	//	properties: [
	//		{
	//			name: 'output',
	//			type: 'string'
	//		}
	//	]
	//});

	//doc.addComponent({
	//	name: 'SomeObject',
	//	properties: [
	//		{
	//			name: 'output',
	//			type: 'string'
	//		}
	//	]
	//});

	//console.log(doc.toJSON());
</script>
