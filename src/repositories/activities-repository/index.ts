import { prisma } from "@/config";

async function getActivities() {
  return prisma.activity.findMany();
}

async function getReservedActivities(userId: number) {
  return prisma.reserve_Activity.findMany({ where: { userId }, select: { activityId: true } });
}

async function reserveActivity(reservation: {activityId: number, userId: number,}) {
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
  getReservedActivities,
  reserveActivity,
  getActivitiesById,
  updateActivity,
};

export default activitiesRepository;

