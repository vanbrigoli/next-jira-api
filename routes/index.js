import expressJwt from "express-jwt";

import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";
import appConfig from "../config/app";
import errorMiddleware from "./middlewares/errorMiddleware";

const routes = router => {
  router.use(
    expressJwt({ secret: appConfig.secretKey }).unless({
      path: ["/api/authenticate"]
    })
  );
  router.use(errorMiddleware.unAuthorizedError);

  AuthRoutes(router);
  UserRoutes(router);
  router.route("/").get((req, res) => {
    res.send("Welcome to Custom JIRA API!");
  });
};

export default routes;
