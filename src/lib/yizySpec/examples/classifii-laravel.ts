import {
  field,
  nullableReferenceType,
  objectType,
  type Service,
} from "@yizy/specification";

export const classifiiApi: Service = {
  serviceName: "ClassifiiApi",
  baseUrls: [
    "http://localhost:8000",
    "https://api.classifii.com",
  ],
  endpoints: [
    {
      url: "/createClaimTicket",
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
