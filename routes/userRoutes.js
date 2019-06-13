import UserController from "../controller/UserController";

const UserRoutes = router => {
  router.route("/users/:userId").get(UserController.getUser);

  router
    .route("/users")
    .get(UserController.getUsers)
    .post(UserController.postUser);
};

export default UserRoutes;
