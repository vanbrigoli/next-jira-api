import ProjectController from "../controller/ProjectController";

const ProjectRoutes = router => {
  router.patch("/projects/:projectId", ProjectController.patchProject);
  router.delete("/projects/:projectId", ProjectController.deleteProject);
  router.post("/projects", ProjectController.postProject);
  router.get("/projects", ProjectController.getProjects);
};

export default ProjectRoutes;
