import AuthRoutes from "./authRoutes";
import UserRoutes from "./userRoutes";
import ProjectRoutes from "./projectRoutes";
import SprintRoutes from "./sprintRoutes";
import TicketRoutes from "./ticketRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";
import authMiddleware from "./middlewares/authMiddleware";

const routes = router => {
  router.use(authMiddleware.verifyToken);
  router.use(errorMiddleware.unAuthorizedError);

  AuthRoutes(router);
  UserRoutes(router);
  ProjectRoutes(router);
  SprintRoutes(router);
  TicketRoutes(router);

  router.use(errorMiddleware.forbiddenError);
};

export default routes;
