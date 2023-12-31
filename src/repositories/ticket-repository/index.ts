import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  });
}
async function findTickeWithTypeById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    }
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true, //inner join
    }
  });
}

async function createTicket(ticket: CreateTicketParams) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    }
  });
}

async function ticketProcessPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

// Get ticket type where isRemote is true and associated with a specific user
async function getUserTicketType(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Enrollment: {
        include: {
          Ticket: {
            include: {
              TicketType: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userEnrollment = user.Enrollment?.[0];
  const userTicket = userEnrollment?.Ticket[0];
  const ticketType = userTicket?.TicketType;

  return ticketType;
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">

const ticketRepository = {
  findTicketTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTickeyById,
  findTickeWithTypeById,
  ticketProcessPayment,
  getUserTicketType
};

export default ticketRepository;
