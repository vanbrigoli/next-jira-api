const AuthRoutes = router => {
  router.route("/test").get((req, res) => {
    res.send("Sample Test API");
  });

  router.route("/authenticate").post((req, res) => {
    const { username, password } = req.body;
  });
};

export default AuthRoutes;
