import { PrismaClient } from "@prisma/client";

const getHosts = async (username, email) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
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
      password: false,
      name: true,
      email: true,
      phoneNumber: true,
      aboutMe: true,
    },
  });

  return hosts;
};

export default getHosts;
