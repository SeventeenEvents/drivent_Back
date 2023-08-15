import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activitiesService from "../services/activities-services";

async function getActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

async function reserveActivity(req: AuthenticatedRequest, res: Response) {
  const { activityId } = req.params;
  const { userId } = req;
  try {
    await activitiesService.reserveActivity(Number(activityId), Number(userId));
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    if (error.name === "CannotReserveError") {
      return res.status(httpStatus.NOT_ACCEPTABLE).send("There are no more vacancies for this activity");
    }
  }
}

async function getReserveActivities(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const reservedActivities = await activitiesService.getReservedActivities(Number(userId));
    return res.status(httpStatus.OK).send(reservedActivities);
  } catch (error) {
    console.log(error);
    if (error.name === "CannotReserveError") {
      return res.status(httpStatus.NOT_ACCEPTABLE).send("There are no more vacancies for this activity");
    }
  }
}

const activitiesController = {
  getActivities,
  reserveActivity,
  getReserveActivities
};
export default activitiesController;
