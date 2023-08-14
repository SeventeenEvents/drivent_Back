import { prisma } from "@/config";
import { reservationParams } from "../../services/activities-services";

async function getActivities() {
    return prisma.activity.findMany();
}

async function getDays() {
    return prisma.activity.groupBy({
        by: ['day']
    });
}

async function reserveActivity(reservation: reservationParams) {
    return prisma.reserve_Activity.create({
        data: {
            ...reservation
        }
    });
}

async function getActivitiesById(activityId: number) {
    return prisma.activity.findUnique({
        where: {
            id: activityId
        }
    });
}

async function updateActivity(activityId: number, remainingVacancies: number) {
    return prisma.activity.update({
        where: { id: activityId },
        data: {
            vacancies: remainingVacancies,
            updatedAt: new Date()
        }
    }
    );
}

const activitiesRepository = {
    getActivities,
    reserveActivity,
    getActivitiesById,
    updateActivity,
    getDays
}

export default activitiesRepository;

