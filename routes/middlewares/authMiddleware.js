import expressJwt from "express-jwt";

import appConfig from "../../config/app";

const SKIP_ROUTE = ["/api/authenticate"];

const verifyToken = expressJwt({ secret: appConfig.secretKey }).unless({
  path: SKIP_ROUTE
});

export default { verifyToken };
