import type { ProgrammingLanguage } from '$lib/models/constants';
import { type ObjectType } from '../YIZYSpec';

export interface GeneratorConfigs {
	baseUrl: string;
}

export interface Generator {
	lang: ProgrammingLanguage;
	generateClientSDKFile(): string;
	generateModelsFile(): string;
	generateRequestModel(object: ObjectType): string;
	generateResponseModel(object: ObjectType): string;
}
