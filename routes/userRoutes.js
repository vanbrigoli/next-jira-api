import Guard from "express-jwt-permissions";

import UserController from "../controller/UserController";
import errorMiddleware from "./middlewares/errorMiddleware";

const UserRoutes = router => {
  router.get("/users/:userId", UserController.getUser);
  router.delete(
    "/users/:userId",
    Guard().check("admin"),
    UserController.deleteUser
  );
  router.patch("/users/:userId", UserController.patchUser);

  router.get("/users", UserController.getUsers);
  router.post("/users", Guard().check("admin"), UserController.postUser);

  router.use(errorMiddleware.forbiddenError);
};

export default UserRoutes;
