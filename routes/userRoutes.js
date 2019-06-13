import UserController from "../controller/UserController";

const UserRoutes = router => {
  router.route("/users").post(UserController.postUser);
};

export default UserRoutes;
