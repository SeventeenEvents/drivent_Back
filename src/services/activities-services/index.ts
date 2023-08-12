import { cannotReserveError, notFoundError } from "@/errors";
import activitiesRepository from "../../repositories/activities-repository";

async function getActivities() {
    const activities = await activitiesRepository.getActivities();

    if (!activities) {
        throw notFoundError();
    }
    return activities;
}

async function reserveActivity(activityId: number, userId: number) {
    const activity = await activitiesRepository.getActivitiesById(activityId);
    if (activity.vacancies === 0) {
        throw cannotReserveError();
    }
    const remainingVacancies = activity.vacancies - 1;
    await activitiesRepository.updateActivity(activityId, remainingVacancies);

    const reservation: reservationParams = { activityId, userId };
    const reserve = await activitiesRepository.reserveActivity(reservation);
}

export type reservationParams = {
    activityId: number,
    userId: number,
}

const activitiesService = {
    getActivities,
    reserveActivity
};

export default activitiesService;