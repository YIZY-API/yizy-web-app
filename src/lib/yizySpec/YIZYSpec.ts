import type { ProgrammingLanguage } from '$lib/models/constants';

export interface Service {
	serviceName: string | NameMap;
	baseUrls: string[];
	endpoints: Endpoint[];
	referenceTypes: ObjectType[];
}

export interface Endpoint {
	url: string;
	name: string | NameMap;
	requestModel: ObjectType | ReferenceType | null;
	responseModel: ObjectType | ReferenceType | null;
}

export function field(field: string | NameMap, type: DataType): Field {
	return {
		name: field,
		type: type
	};
}

export interface Field {
	name: string | NameMap;
	type: DataType;
}

export interface NameMap {
	default: string;
	golang: string | undefined;
	php: string | undefined;
	typescript: string | undefined;
}

export type DataType =
	| PrimativeTypes
	| ObjectType
	| NullableObjectType
	| ArrayType
	| NullableArrayType
	| ReferenceType
	| NullableReferenceType;

export type PrimativeTypes =
	| 'float'
	| 'float?'
	| 'double'
	| 'double?'
	| 'string'
	| 'string?'
	| 'boolean'
	| 'boolean?'
	| 'int'
	| 'int?'
	| 'int32'
	| 'int32?'
	| 'int64'
	| 'int64?';

export enum TypeIdentifier {
	ObjectType = 'Object',
	NullableObjectType = 'NullableObject',
	ArrayType = 'Array',
	NullableArrayType = 'NullableArray',
	ReferenceType = 'Reference',
	NullableReferenceType = 'NullableReference'
}

export interface NonPrimitiveType {
	type: TypeIdentifier;
}

export function objectType(name: string | NameMap, fields: Field[]): ObjectType {
	return {
		name: name,
		fields: fields,
		type: TypeIdentifier.ObjectType
	};
}

export interface ObjectType {
	type: TypeIdentifier;
	name: string | NameMap;
	fields: Field[];
}

export function nullableObjectType(name: string | NameMap, fields: Field[]): NullableObjectType {
	return {
		type: TypeIdentifier.NullableObjectType,
		name: name,
		fields: fields
	};
}

export interface NullableObjectType {
	type: TypeIdentifier;
	name: string | NameMap;
	fields: Field[];
}

export function arrayType(itemType: DataType): ArrayType {
	return { itemType: itemType, type: TypeIdentifier.ArrayType };
}
export interface ArrayType {
	itemType: DataType;
	type: TypeIdentifier;
}

export function nullableArrayType(itemType: DataType): NullableArrayType {
	return { itemType: itemType, type: TypeIdentifier.NullableArrayType };
}

export interface NullableArrayType {
	itemType: DataType;
	type: TypeIdentifier;
}

export function referenceType(ref: string): ReferenceType {
	return {
		ref: ref,
		type: TypeIdentifier.ReferenceType
	};
}

export interface ReferenceType {
	ref: string;
	type: TypeIdentifier;
}

export function nullableReferenceType(ref: string): NullableReferenceType {
	return {
		ref: ref,
		type: TypeIdentifier.NullableReferenceType
	};
}
export interface NullableReferenceType {
	ref: string;
	type: TypeIdentifier;
}

export function findObjectTypeFromReferenceType(
	service: Service,
	ref: ReferenceType | ObjectType
): ObjectType | null {
	if (ref.type == TypeIdentifier.ObjectType) {
		return ref as ObjectType;
	}
	const res = service.referenceTypes.filter((refType) => {
		return refType.name == (ref as ReferenceType).ref;
	});
	if (res.length == 0) return null;
	return res[0];
}

export function isObjectType(type: DataType) {
	if (typeof type === 'string') return false;
	const t: NonPrimitiveType = type as NonPrimitiveType;
	return t.type == TypeIdentifier.ObjectType;
}

export function isArrayType(type: DataType) {
	if (typeof type === 'string') return false;
	const t: NonPrimitiveType = type as NonPrimitiveType;
	return t.type == TypeIdentifier.ArrayType;
}

export function isNullable(type: DataType) {
	if (typeof type === 'string') {
		switch (type) {
			case 'float?':
				return true;
			case 'double?':
				return true;
			case 'string?':
				return true;
			case 'boolean?':
				return true;
			case 'int?':
				return true;
			case 'int32?':
				return true;
			case 'int64?':
				return true;
			default:
				return false;
		}
	} else {
		const t = type as NonPrimitiveType;
		switch (t.type) {
			case TypeIdentifier.NullableArrayType:
				return true;
			case TypeIdentifier.NullableObjectType:
				return true;
			case TypeIdentifier.NullableReferenceType:
				return true;
			default:
				return false;
		}
	}
}

export function getLanguageSpecificName(nameMap: NameMap, lang: ProgrammingLanguage): string {
	if (lang.toString() in nameMap) {
		const key = lang.toString() as keyof typeof nameMap;
		return nameMap[key] ?? nameMap.default;
	}
	return nameMap.default;
}
