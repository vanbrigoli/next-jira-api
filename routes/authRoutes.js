import AuthController from "../controller/AuthController";

const AuthRoutes = router => {
  router.route("/authenticate").post(AuthController.authenticate);
};

export default AuthRoutes;
