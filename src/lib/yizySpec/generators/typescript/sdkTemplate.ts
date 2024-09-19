export const FUNCTION_TEMPLATE = `
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

export interface FunctionTemplateInput {
	returnType: string;
	functionName: string;
	argType: string;
	postUrl: string;
}

export interface SdkFileTemplateInput {
	functions: FunctionTemplateInput[];
}
