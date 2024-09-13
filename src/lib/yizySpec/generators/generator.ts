import { type Service, ProgrammingLanguage, type Endpoint } from '../YIZYSpec';
import Handlebars from 'handlebars';

export function generateModelsFromService(lang: ProgrammingLanguage, service: Service): string {
	switch (lang) {
		case ProgrammingLanguage.php:
			return generatePhpModels(service);

		default:
			return '';
	}
}
