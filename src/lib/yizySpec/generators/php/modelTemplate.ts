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

export const MODEL_FILE_TEMPLATE = `
trait FromArray
{
    public static function create(array $values): self
    {
        $dto = new self();

        foreach ($values as $key => $value) {
            if (property_exists($dto, $key)) {
                $dto->$key = $value;
            }
        }

        return $dto;
    }
}

trait ToArray
{
    public function toArray(): array
    {
        return get_object_vars($this);
    }
}

{{#each models}}
class {{this.name}}
{
    use FromArray;
    use ToArray;

    {{#each this.fields}}
    public {{this.type}} \${{this.name}};
    {{/each}}
}

{{/each}}
`;

export const MODEL_TEMPLATE = `
class {{this.name}}
{
    {{#each this.fields}}
    public {{this.type}} \${{this.name}};
    {{/each}}
}
`;
