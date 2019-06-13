import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";

const routes = router => {
  AuthRoutes(router);
  UserRoutes(router);
  router.route("/").get((req, res) => {
    res.send("Welcome to Custom JIRA API!");
  });
};

export default routes;
