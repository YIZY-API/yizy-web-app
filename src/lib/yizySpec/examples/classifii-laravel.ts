import {
  field,
  nullableReferenceType,
  objectType,
  type Service,
} from "@yizy/spec";

export const classifiiApi: Service = {
  serviceName: "ClassifiiApi",
  description: "",
  environment: [
    { name: "", url: "http://localhost:8000" },
    { name: "", url: "https://api.classifii.com" },
  ],
  endpoints: [
    {
      url: "/createClaimTicket",
      description: "",
      name: "createClaimTicket",
      requestModel: objectType(
        "CreateClaimTicketRequest",
        [
          field("transactionId", "string"),
          field("transactionStatusId", "string"),
        ],
      ),
      responseModel: objectType(
        "CreateClaimTicketResponse",
        [
          field("url", "string"),
          field("error", nullableReferenceType("ClassifiiApiError")),
        ],
      ),
    },
  ],
  referenceTypes: [
    objectType("ClassifiiApiError", [
      field("code", "int"),
      field("msg", "string"),
    ]),
  ],
};
