import {
  unAuthorizedRequest,
  forbiddenResponse
} from "../../utils/commonResponse";

const forbiddenError = (err, req, res, next) => {
  if (err.code === "permission_denied") {
    forbiddenResponse(res, { message: "Permission denied." });
  }
};

const unAuthorizedError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    unAuthorizedRequest(res, { message: "Invalid token." });
  }
};

export default { forbiddenError, unAuthorizedError };
