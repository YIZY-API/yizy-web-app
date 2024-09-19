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

export const MODEL_TEMPLATE = `
export interface {{this.name}}
{
    {{#each this.fields}}
    {{this.name}}: {{this.type}};
    {{/each}}
}

`;
export const MODEL_FILE_TEMPLATE = `{{#each models}}` + MODEL_TEMPLATE + `{{/each}}`;
