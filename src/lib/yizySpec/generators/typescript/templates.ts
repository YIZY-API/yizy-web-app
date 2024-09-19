export const POST_REQUEST_FUNCTION_TEMPLATE = `
export async function {{functionName}}({{#if argType}}req: {{argType}} {{/if}}): Promise<{{#if returnType}}{{returnType}}{{else}}void{{/if}}> {
  try {
    const response = await fetch( "{{postUrl}}", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      {{#if argType}}
      body: JSON.stringify(req)
      {{/if}}
    });

    {{#if returnType}}
    const result: {{returnType}} = await response.json();
    return result;
    {{else}}
    return;
    {{/if}}
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
}
`;

export interface PostRequestFunctionTemplateInput {
	returnType: string;
	functionName: string;
	argType: string;
	postUrl: string;
}

export interface ClientSdkFileTemplateInput {
	functions: PostRequestFunctionTemplateInput[];
}

export const MODEL_TEMPLATE = `
export interface {{this.name}}
{
    {{#each this.fields}}
    {{this.name}}: {{this.type}};
    {{/each}}
}

`;
export const MODEL_FILE_TEMPLATE = `{{#each models}}` + MODEL_TEMPLATE + `{{/each}}`;

export interface ModelFileTemplateInput {
	models: ModelTemplateInput[];
}

export interface ModelTemplateInput {
	name: string;
	fields: FieldTemplateInput[];
}

export interface FieldTemplateInput {
	name: string;
	type: string;
}
