import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivities, reserveActivity } from "../controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
    .all("/*", authenticateToken)
    .get("", getActivities)
    .post("/reserve/:activityId", reserveActivity);

export { activitiesRouter };