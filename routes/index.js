import expressJwt from "express-jwt";

import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";
import key from "../config/key";
import errorMiddleware from "./middlewares/errorMiddleware";

const routes = router => {
  router.use(
    expressJwt({ secret: key.secretKey }).unless({
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
