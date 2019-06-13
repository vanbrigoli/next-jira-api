import AuthRoutes from "./authRoutes";

const routes = router => {
  AuthRoutes(router);
  router.route("/").get((req, res) => {
    res.send("Welcome to Custom JIRA API!");
  });
};

export default routes;
