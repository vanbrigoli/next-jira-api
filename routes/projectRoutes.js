import ProjectController from "../controller/ProjectController";

const ProjectRoutes = router => {
  router.post("/projects", ProjectController.postProject);
  router.get("/projects", ProjectController.getProjects);
};

export default ProjectRoutes;
