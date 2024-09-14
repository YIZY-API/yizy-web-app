export const FUNCTION_TEMPLATE = `
/**
 * @return {{returnType}} 
 */
function {{functionName}}({{argType}} $req): object
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

export interface FunctionTemplateInput {
	returnType: string;
	functionName: string;
	argType: string;
	postUrl: string;
}

export interface SdkFileTemplateInput {
	functions: FunctionTemplateInput[];
}
