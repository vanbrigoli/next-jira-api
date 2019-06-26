import SprintController from "../controller/SprintController";

const SprintRoutes = router => {
  router.get("/sprints/:sprintId", SprintController.getSprint);
  router.patch("/sprints/:sprintId", SprintController.patchSprint);
  router.delete("/sprints/:sprintId", SprintController.deleteSprint);
  router.post("/sprints", SprintController.postSprint);
  router.get("/sprints", SprintController.getSprints);
};

export default SprintRoutes;
