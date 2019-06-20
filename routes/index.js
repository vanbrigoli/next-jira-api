import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";
import ProjectRoutes from "./projectRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import authMiddleware from "./middlewares/authMiddleware";

const routes = router => {
  router.use(authMiddleware.verifyToken);
  router.use(errorMiddleware.unAuthorizedError);

  AuthRoutes(router);
  UserRoutes(router);
  ProjectRoutes(router);

  router.route("/").get((req, res) => {
    res.send("Welcome to Custom JIRA API!");
  });
};

export default routes;
