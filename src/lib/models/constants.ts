export enum ProgrammingLanguage {
  Typescript = "Typescript",
  //Php = "Php",
}

export function convertStringToProgrammingLanguage(
  val: string,
): ProgrammingLanguage {
  return ProgrammingLanguageList.find((l) => {
    return l === val;
  }) ??
    ProgrammingLanguage.Typescript;
}

export const ProgrammingLanguageList = Object.values(ProgrammingLanguage);
