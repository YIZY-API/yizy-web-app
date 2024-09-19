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

export const POST_REQUEST_FUNCTION_TEMPLATE = `
/**
 * @return {{returnType}} 
 */
function {{functionName}}({{#if argType}}{{argType}} $req{{/if}}): object
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "{{postUrl}}");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($req));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $res = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return json_decode($res, false);
}

`;

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

export interface PostRequestFunctionTemplateInput {
	returnType: string;
	functionName: string;
	argType: string;
	postUrl: string;
}

export interface ClientSdkFileTemplateInput {
	functions: PostRequestFunctionTemplateInput[];
}
