const AuthRoutes = router => {
  router.route("/test").get((req, res) => {
    res.send("Sample Test API");
  });
};

export default AuthRoutes;
