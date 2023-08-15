import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import activitiesController from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("", activitiesController.getActivities)
  .get("/reserved", activitiesController.getReserveActivities)
  .post("/reserve/:activityId", activitiesController.reserveActivity);

export { activitiesRouter };
