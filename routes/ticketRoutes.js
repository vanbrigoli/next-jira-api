import TicketController from "../controller/TicketController";

const TicketRoutes = router => {
  router.get("/tickets/:ticketId", TicketController.getTicket);
  router.patch("/tickets/:ticketId", TicketController.patchTicket);
  router.delete("/tickets/:ticketId", TicketController.deleteTicket);
  router.post("/tickets", TicketController.postTicket);
  router.get("/tickets", TicketController.getTickets);
};

export default TicketRoutes;
