import ProjectController from "../controller/xProjectController";

const ProjectRoutes = router => {
  router.get("/projects/:projectId", ProjectController.getProject);
  router.patch("/projects/:projectId", ProjectController.patchProject);
  router.delete("/projects/:projectId", ProjectController.deleteProject);
  router.post("/projects", ProjectController.postProject);
};

export default ProjectRoutes;
