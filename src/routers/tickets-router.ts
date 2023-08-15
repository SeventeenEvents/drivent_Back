import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketTypes, getTickets, createTicket, getUserTicketType } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/usertype", getUserTicketType)
  .get("", getTickets)
  .post("", createTicket);

export { ticketsRouter };
