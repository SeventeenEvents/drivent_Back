import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {

  let ticketTypes = await prisma.ticketType.findMany();
  if (ticketTypes.length === 0) {
    // Se não existem, cria os dois tipos de ingressos
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

  console.log("Evento criado:", event);

  let users = await prisma.user.findMany();


  if (users.length > 0) {
    // Criação dos usuários e tickets

    const user4 = await prisma.user.create({
      data: {
        email: "4@gmail.com",
        password: await bcrypt.hash("password123", 10),
        Enrollment: {
          create: {
            name: "User 4",
            cpf: "12345678901",
            birthday: dayjs("1995-01-01").toDate(),
            phone: "123456789",
            Address: {
              create: {
                cep: "21911430",
                street: "Rua Magno Martins",
                city: "Rio de Janeiro",
                state: "RJ",
                number: "456",
                neighborhood: "Freguesia",
              },
            },
            Ticket: {
              create: {
                TicketType: {
                  connect: {
                    id: 2,
                  },
                },
                status: "RESERVED",
              },
            },
          },
        },
      },
    });



    console.log("Usuários criados:", user4);
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
