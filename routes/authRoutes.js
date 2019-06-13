const AuthRoutes = router => {
  router.route("/authenticate").post((req, res) => {
    const { username, password } = req.body;
  });
};

export default AuthRoutes;
