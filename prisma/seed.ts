import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  console.log("Starting...");
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
  console.log({ event });

  let hotel = await prisma.hotel.findMany();
  if (hotel.length === 0) {
    await prisma.hotel.create({
      data: {
        name: 'River View',
        image: 'https://thumbs.dreamstime.com/z/hotel-pobre-na-margem-do-rio-lama-em-prédio-é-sinal-imaginário-de-182841098.jpg?w=992',
        updatedAt: dayjs().toDate(),
      }
    });
    await prisma.hotel.create({
      data: {
        name: 'Top Hotel',
        image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/242052129.jpg?k=e422a5e94fdf6bd58951e40388230cb1588ca93c872cf384a6ad4ea932723d79&o=&hp=1',
        updatedAt: dayjs().toDate(),
      }
    });
    await prisma.hotel.create({
      data: {
        name: 'Forest Hotel',
        image: 'https://www.gov.br/turismo/pt-br/assuntos/noticias/hotel-de-floresta-o-local-ideal-para-quem-deseja-uma-pausa-em-meio-a-natureza/PousadaUakariCrditoMarioOliveiraMTur.png/@@images/ccce0f25-de0e-4d15-ad68-0cd940bf762e.png',
        updatedAt: dayjs().toDate(),
      }
    });
  }

  let rooms = await prisma.room.findMany();
  if(rooms.length === 0) {
    await prisma.room.createMany({
      data: [
        {
          name: '101',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: '102',
          capacity: 2,
          hotelId: 1,
        },
        {
          name: '103',
          capacity: 3,
          hotelId: 1,
        },
        {
          name: '101',
          capacity: 3,
          hotelId: 2,
        },
        {
          name: '102',
          capacity: 2,
          hotelId: 2,
        },
        {
          name: '103',
          capacity: 3,
          hotelId: 2,
        }
      ]
      });
  }

  let activities = await prisma.activity.findMany();
  if (activities.length === 0) {
    await prisma.activity.createMany({
      data: [{
        day: new Date(2024, 3, 16),
        location: 'River Island',
        name: 'How to train your Squirtle',
        startAt: new Date(2024, 3, 16, 9),
        duration: 3,
        endAt: new Date(2024, 3, 16, 12),
        vacancies: 30,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      {
        day: new Date(2024, 3, 16),
        location: 'Mountain Top',
        name: 'How to train your Charmander',
        startAt: new Date(2024, 3, 16, 9),
        duration: 3,
        endAt: new Date(2024, 3, 16, 12),
        vacancies: 30,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      {
        day: new Date(2024, 3, 16),
        location: 'Deep Jungle',
        name: 'How to train your Bulbasaur',
        startAt: new Date(2024, 3, 16, 9),
        duration: 3,
        endAt: new Date(2024, 3, 16, 12),
        vacancies: 30,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      {
        day: new Date(2024, 3, 17),
        location: 'River Island',
        name: 'How to evolve Eeve into Vaporeon',
        startAt: new Date(2024, 3, 17, 14),
        duration: 2,
        endAt: new Date(2024, 3, 17, 16),
        vacancies: 15,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      {
        day: new Date(2024, 3, 17),
        location: 'Mountain Top',
        name: 'How to evolve Eeve into Flareon',
        startAt: new Date(2024, 3, 17, 14),
        duration: 2,
        endAt: new Date(2024, 3, 17, 16),
        vacancies: 15,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      {
        day: new Date(2024, 3, 17),
        location: 'Deep Jungle',
        name: 'How to evolve Eeve into Leafeon',
        startAt: new Date(2024, 3, 17, 14),
        duration: 2,
        endAt: new Date(2024, 3, 17, 16),
        vacancies: 15,
        createdAt: dayjs().toDate(),
        updatedAt: dayjs().toDate()
      },
      ]
    });
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

