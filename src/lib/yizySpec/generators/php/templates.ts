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
export const MODEL_FILE_TEMPLATE = `<?php\n\n` + `{{#each models}}` +
  MODEL_TEMPLATE +
  `{{/each}}`;

export const POST_REQUEST_FUNCTION_TEMPLATE = `
/**
 * @param headers string[]
 * @return {{returnType}} 
 */
function {{functionName}}({{#if argType}}{{argType}} $req, {{/if}}$headers = []): object
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "{{postUrl}}");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($req));
    $defaultHeaders = array('Content-Type:application/json');
    $allHeaders = array_merge($defaultHeaders, $headers);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $allHeaders);
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
