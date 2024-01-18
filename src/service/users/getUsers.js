import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
      email: {
        contains: email,
      },
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      password: false,
    },
  });

  return users;
};

export default getUsers;
