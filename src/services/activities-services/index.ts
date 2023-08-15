import { cannotReserveError, notFoundError } from "@/errors";
import activitiesRepository from "../../repositories/activities-repository";
import dayjs from "dayjs";

async function getActivities() {
  const activities = await activitiesRepository.getActivities();

  if (!activities) {
    throw notFoundError();
  }

  // Objeto para armazenar as atividades agrupadas
  const groupedData: {days: string[], locations: string[], activities: object[]}= {
    days: [],
    locations: [],
    activities: []
  };
  
  // Função para verificar se um elemento existe em uma lista
  function existsInList(list: string[], value: string ) {
    return list.includes(value);
  }
  
  activities.forEach(activity => {
    const { day, location } = activity;
  
    // Adicionar dia à lista de dias se ainda não estiver lá
    if (!existsInList(groupedData.days, dayjs(day).format())) {
      groupedData.days.push(dayjs(day).format());
    }
  
    // Adicionar local à lista de locais se ainda não estiver lá
    if (!existsInList(groupedData.locations, location)) {
      groupedData.locations.push(location);
    }
  
    // Adicionar atividade à lista de atividades
    groupedData.activities.push({ ...activity, day: dayjs(activity.day).format() });
  });
  return groupedData;
}

async function reserveActivity(activityId: number, userId: number) {
  const activity = await activitiesRepository.getActivitiesById(activityId);
  if (activity.vacancies === 0) {
    throw cannotReserveError();
  }
  const remainingVacancies = activity.vacancies - 1;
  await activitiesRepository.updateActivity(activityId, remainingVacancies);

  const reservation: reservationParams = { activityId, userId };
  await activitiesRepository.reserveActivity(reservation);
}

async function getReservedActivities(userId: number) {
  const reservedActivities = await activitiesRepository.getReservedActivities( userId);
  if(!reservedActivities) return [];
  const response = [{ reservedActivitiesId: reservedActivities.map((r) => r.activityId) }];
  return response;
}

export type reservationParams = {
    activityId: number,
    userId: number,
}

const activitiesService = {
  getActivities,
  getReservedActivities,
  reserveActivity
};

export default activitiesService;
