import {
  arrayType,
  field,
  nullableReferenceType,
  objectType,
  referenceType,
  type Service,
} from "@yizy/specification";

export const classifiiApi: Service = {
  serviceName: "ClassifiiApi",
  baseUrls: [
    "https://staging.classifii.com/20240906/wp/cl_app",
    "https://classifii.com/20240906/wp/cl_app",
  ],
  endpoints: [
    {
      url: "/api/sendTransactionStatusUpdateNotification.php",
      name: "sendTransactionStatusUpdateNotification",
      requestModel: objectType(
        "SendTransactionStatusUpdateNotificationRequest",
        [
          field("transactionId", "string"),
          field("transactionStatusId", "string"),
        ],
      ),
      responseModel: objectType(
        "SendTransactionStatusUpdateNotificationResponse",
        [
          field("error", nullableReferenceType("ClassifiiServiceException")),
        ],
      ),
    },
    {
      url: "/api/updateTransactionStatus.php",
      name: "updateTransactionStatus",
      requestModel: objectType("UpdateTransactionStatusRequest", [
        field("transactionId", "string"),
        field("transactionStatus", "string"),
      ]),
      responseModel: objectType("UpdateTransactionStatusResponse", [
        field("error", nullableReferenceType("ClassifiiServiceException")),
      ]),
    },
    {
      url: "/api/registerGuestWithPhoneNumber.php",
      name: "registerGuestWithPhoneNumber",
      requestModel: objectType("RegisterGuestWithPhoneNumberRequest", [
        field("phone", "string"),
      ]),
      responseModel: objectType("RegisterGuestWithPhoneNumberResponse", [
        field("error", nullableReferenceType("ClassifiiServiceException")),
        field("userId", "string"),
      ]),
    },
    {
      url: "/api/getTransactionStatusMessages.php",
      name: "getTransactionStatusMessage",
      requestModel: null,
      responseModel: objectType("GetTransactionStatusMessageResponse", [
        field("error", nullableReferenceType("ClassifiiServiceException")),
        field("messages", arrayType(referenceType("TransactionMessage"))),
      ]),
    },
  ],
  referenceTypes: [
    objectType("ClassifiiServiceException", [
      field("code", "int"),
      field("msg", "string"),
      field("name", "string"),
    ]),
    objectType("TransactionMessage", [
      field("status", "string"),
      field("buyerDescription", "string"),
      field("sellerDescription", "string"),
      field("fulfillmentCenterDescription", "string"),
    ]),
  ],
};
