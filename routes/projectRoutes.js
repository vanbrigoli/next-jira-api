import ProjectController from "../controller/ProjectController";

const ProjectRoutes = router => {
  router.post("/projects", ProjectController.postProject);
};

export default ProjectRoutes;
