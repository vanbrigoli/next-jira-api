import AuthController from "../controller/AuthController";

const AuthRoutes = router => {
  router.route("/authenticate").post(AuthController.authenticate);
  router.route("/authmanagement").post(AuthController.changePassword);
};

export default AuthRoutes;
