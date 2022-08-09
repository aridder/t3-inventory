import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const items = [
  "ps5",
  "canon600d",
  "iphone",
  "burton snowboard",
  "hellsport tent",
  "focus aventura bike",
  "macbook pro",
];

const data: Prisma.UserCreateInput[] = [
  {
    username: "john",
  },
  {
    username: "sira",
  },
  {
    username: "kari54",
  },
  {
    username: "freddy",
  },
];

async function main() {
  console.log("start seeding");
  const userIds = [];
  for (let i = 0; i < data.length; i++) {
    const userInput = data[i];
    if (!userInput) return;

    const user = await prisma.user.create({
      data: {
        ...userInput,
      },
    });

    userIds.push(user.id);

    for (let j = 0; j < items.length; j++) {
      const createdMock = new Date();
      const randomMonth = Math.floor(Math.random() * 12) % 8;
      createdMock.setMonth(randomMonth);

      const item = await prisma.item.create({
        data: {
          title: items[j] ?? "",
          ownerId: user.id,
        },
      });
      await prisma.item.update({
        where: {
          id: item.id,
        },
        data: {
          createdAt: createdMock,
        },
      });

      if (i > 0) {
        const toUserId = userIds[i - 1] ?? "";
        const transfer = await prisma.itemTransfer.create({
          data: {
            itemId: item.id,
            fromUserId: user.id,
            toUserId: toUserId,
          },
        });
        await prisma.itemTransfer.update({
          where: {
            id: transfer.id,
          },
          data: {
            createdAt: createdMock,
          },
        });
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
