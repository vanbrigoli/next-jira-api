import ProjectController from "../controller/ProjectController";

const ProjectRoutes = router => {
  router.get("/projects/:projectId", ProjectController.getProject);
  router.patch("/projects/:projectId", ProjectController.patchProject);
  router.delete("/projects/:projectId", ProjectController.deleteProject);
  router.get("/projects", ProjectController.getProjects);
  router.post("/projects", ProjectController.postProject);
};

export default ProjectRoutes;
