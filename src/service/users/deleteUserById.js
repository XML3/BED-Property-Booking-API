import { PrismaClient } from "@prisma/client";

const deleteUser = async (id) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.deleteMany({
    where: { id },
  });

  if (user.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteUser;
