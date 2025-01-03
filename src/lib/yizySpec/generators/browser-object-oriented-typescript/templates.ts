export interface Route {
  name: string;
  url: string;
}

export interface ServiceRouteTemplateInput {
  serviceName: string;
  routes: Route[];
}
export const SERVICE_ROUTE_TEMPLATE = `
export const {{serviceName}}Routes = {
    {{#each this.routes}}
    {{this.name}}: '{{this.url}}';
    {{/each}}
}

`;

export interface Env {
  baseUrl: string;
  name: string;
}
export interface HooksAndConfigsTemplateInput {
  serviceName: string;
  environments: Env[];
}

export const HOOKS_AND_CONFIGS_TEMPLATE = `
export interface {{this.serviceName}}ApiClientConfigs {
    baseUrl: string;
    requestConfigs: RequestInit;
}

export interface Hooks {
    overrideRequestConfigs?: (
        defaultConfigs: RequestInit,
    ) => RequestInit;
    onResponse?: (res: Response) => void;
}

{{#each this.environments}}
export const {{this.name}}Configs: {{../serviceName}}ApiClientConfigs = {
    baseUrl: "{{this.baseUrl}}",
    requestConfigs: {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    },
};

{{/each}}`;

export const METHOD_TEMPLATE = `
export async function {{functionName}}({{#if argType}}req: {{argType}},{{/if}} configs: {{serviceName}}ApiClientConfigs, hooks?: Hooks): Promise<{{#if returnType}}{{returnType}}{{else}}void{{/if}}> {
    let opts = configs.requestConfigs;

    {{#if argType}}
    opts.body = JSON.stringify(req);
    {{/if}}

    if (hooks?.overrideRequestConfigs) {
        opts = hooks.overrideRequestConfigs(opts);
    }

    const response: Response = await fetch(configs.baseUrl + "{{postUrl}}", opts);

    if (hooks?.onResponse) {
        hooks.onResponse(response);
    }

    {{#if returnType}}
    const result: {{returnType}} = await response.json();
    return result;
    {{else}}
    return;
    {{/if}}
}
`;

export interface MethodTemplateInput {
  returnType: string;
  functionName: string;
  argType: string;
  postUrl: string;
  serviceName: string;
}

export interface ClassTemplateInput {
  serviceName: string;
  methods: MethodTemplateInput[];
}

export const CLASS_TEMPLATE = `export class {{serviceName}} {
    private configs: {{serviceName}}ApiClientConfigs;

    constructor(configs: {{serviceName}}ApiClientConfigs) {
        this.configs = configs;
    }

    getApiClientConfigs(): {{serviceName}}ApiClientConfigs {
        return this.configs;
    }

    updateApiClientConfigs(configs: {{serviceName}}ApiClientConfigs) {
        this.configs = configs;
    }

    {{#each methods}}
    async {{functionName}}({{#if argType}}req: {{argType}}, {{/if}}hooks?: Hooks): Promise<{{#if returnType}}{{returnType}}{{else}}void{{/if}}> {
        let opts = this.configs.requestConfigs;

        {{#if argType}}
        opts.body = JSON.stringify(req);
        {{/if}}

        if (hooks?.overrideRequestConfigs) {
            opts = hooks.overrideRequestConfigs(opts);
        }

        const response: Response = await fetch(this.configs.baseUrl + "{{postUrl}}", opts);

        if (hooks?.onResponse) {
            hooks.onResponse(response);
        }

        {{#if returnType}}
        const result: {{returnType}} = await response.json();
        return result;
        {{else}}
        return;
        {{/if}}
    }

  {{/each}}
}
`;

export const MODEL_TEMPLATE = `
export interface {{this.name}}
{
    {{#each this.fields}}
    {{this.name}}: {{this.type}};
    {{/each}}
}

`;
export const MODEL_FILE_TEMPLATE = `{{#each models}} ` + MODEL_TEMPLATE +
  `{{/each}} `;

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
