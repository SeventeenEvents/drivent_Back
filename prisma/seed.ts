import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  let ticketTypes = await prisma.ticketType.findMany();
  if (ticketTypes.length === 0) {
    const presencialTicket = await prisma.ticketType.create({
      data: {
        name: "Presencial",
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
    });

    const onlineTicket = await prisma.ticketType.create({
      data: {
        name: "Online",
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
    });

    const presencialTicketWithHotel = await prisma.ticketType.create({
      data: {
        name: "Presencial com Hotel",
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    });

    console.log("Tipos de ingressos criados:", presencialTicket, onlineTicket, presencialTicketWithHotel);
  }

  let ticket = await prisma.ticket.findMany();
  if (ticket.length === 0) {
    let type = await prisma.ticketType.findFirst({ where: { name: "Presencial com Hotel" } });
    const mockType = { id: 1 };
    if (type === null) return mockType;
    let enrollment = await prisma.enrollment.findFirst();
    const mockEnrollment = { id: 1 };
    if (enrollment === null) return mockEnrollment;
    const ticket = await prisma.ticket.create({
      data: {
        ticketTypeId: type.id,
        enrollmentId: enrollment.id,
        status: 'PAID',
        updatedAt: dayjs().toDate(),
      },
    });
    console.log(ticket);
  }

  let payment = await prisma.payment.findMany();
  if (payment.length === 0) {
    let ticket = await prisma.ticket.findFirst();
    const mockTicket = { id: 1 };
    if (ticket === null) return mockTicket;
    const payment = await prisma.payment.create({
      data: {
        ticketId: ticket.id,
        value: 600,
        cardIssuer: 'VISA',
        cardLastDigits: '3748',
        updatedAt: dayjs().toDate(),
      },
    });
    console.log(payment);
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
