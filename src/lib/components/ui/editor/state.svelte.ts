import { type Document } from "./models/models";

export const defaultState: Document = {
  name: "",
  description: "",
  environment: [
    {
      name: "",
      baseUrl: "",
    },
  ],
  endpoints: [
    {
      name: "",
      url: "",
      description: "",
      req: {
        name: "",
        fields: [
          {
            name: "",
            type: "",
          },
        ],
      },
      res: {
        name: "",
        fields: [
          {
            name: "",
            type: "",
          },
        ],
      },
    },
  ],
  additionalModels: [
    {
      name: "",
      fields: [
        {
          name: "",
          type: "",
        },
      ],
    },
  ],
};

export const documentState: Document = $state(defaultState);
export function updateDocumentState(doc: Document) {
  documentState.name = doc.name;
  documentState.description = doc.description;
  documentState.environment = doc.environment;
  documentState.endpoints = doc.endpoints;
  documentState.additionalModels = doc.additionalModels;
}

export const getLspTypes = () => _lspTypes;
const _lspTypes = $derived.by(() => {
  console.log("updated, recalculating types");
  console.log(documentState);
  const primitiveTypes = [
    "boolean",
    "boolean?",
    "boolean[]",
    "double",
    "double?",
    "double[]",
    "float",
    "float?",
    "float[]",
    "int",
    "int?",
    "int[]",
    "int32",
    "int32[]",
    "int32?",
    "int64",
    "int64?",
    "int64[]",
    "string",
    "string?",
    "string[]",
  ];

  const types = documentState
    ? documentState.additionalModels.flatMap((model) => model.name)
    : [];
  console.log("updating types!", types);
  const res: string[] = [];
  types.forEach((t: string) => {
    res.push(t);
    res.push(t + "?");
    res.push(t + "[]");
  });
  return [...primitiveTypes, ...res];
});
