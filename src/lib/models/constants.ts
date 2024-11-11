export enum ProgrammingLanguage {
  Typescript = "Typescript",
  Php = "Php",
}

export function convertStringToProgrammingLanguage(
  val: string,
): ProgrammingLanguage {
  console.log(ProgrammingLanguageList.find((l) => l === val));
  return ProgrammingLanguageList.find((l) => {
    return l === val;
  }) ??
    ProgrammingLanguage.Typescript;
}

export const ProgrammingLanguageList = Object.values(ProgrammingLanguage);
