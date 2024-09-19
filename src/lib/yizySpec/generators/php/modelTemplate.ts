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
	phpDocType: string;
}

export const MODEL_TEMPLATE = `
class {{this.name}}
{
    {{#each this.fields}}
    {{#if this.type}}
    public {{this.type}} \${{this.name}};
    {{else}}
    /**
     * @var {{this.phpDocType}} 
     */
    public \${{this.name}};
    {{/if}}
    {{/each}}
}

`;
export const MODEL_FILE_TEMPLATE = `{{#each models}}` + MODEL_TEMPLATE + `{{/each}}`;
