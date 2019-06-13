import Guard from "express-jwt-permissions";

import UserController from "../controller/UserController";
import errorMiddleware from "./middlewares/errorMiddleware";

const UserRoutes = router => {
  router.route("/users/:userId").get(UserController.getUser);

  router.get("/users", UserController.getUsers);

  router.post("/users", Guard().check("admin"), UserController.postUser);

  router.use(errorMiddleware.forbiddenError);
};

export default UserRoutes;
