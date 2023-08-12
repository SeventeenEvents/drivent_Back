import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

async function findTickeyById (ticketId: number) {
  const ticket = await ticketRepository.findTickeyById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function getUserTicketType(enrollmentId: string) {
  const userId = await enrollmentRepository.findUserIdByEnrollmentId(enrollmentId);

  if (!userId) {
    throw notFoundError();
  }

  const ticketType = await ticketRepository.getUserTicketType(userId);

  if (!ticketType) {
    throw notFoundError();
  }

  return ticketType;
}


const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
  findTickeyById,
  getUserTicketType,
};

export default ticketService;
