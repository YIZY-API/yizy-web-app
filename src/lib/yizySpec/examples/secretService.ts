import {
  field,
  nullableReferenceType,
  objectType,
  referenceType,
  type Service,
} from "@yizy/spec";

export const secretService: Service = {
  serviceName: "SecretService",
  description:
    "A service for demonstrating how easy it is to write API Spec with YIZY.",
  environment: [
    { name: "Mock", url: "http://localhost:4010" },
    { name: "Local", url: "http://localhost:8080" },
  ],
  endpoints: [
    {
      url: "/agents/getAgentByName",
      description: "Retrieves an agent by name.",
      name: "getAgentByName",
      requestModel: objectType("GetAgentByNameRequest", [
        field("name", "string"),
      ]),
      responseModel: objectType("GetAgentByNameResponse", [
        field("error", nullableReferenceType("Error")),
        field("agent", referenceType("Agent")),
      ]),
    },
  ],
  referenceTypes: [
    objectType("Agent", [
      field("name", "string"),
      field("age", "int"),
      field("department", "string"),
    ]),
    objectType("Error", [
      field("code", "int"),
      field("msg", "string"),
      field("name", "string"),
    ]),
  ],
};
