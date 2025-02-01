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
