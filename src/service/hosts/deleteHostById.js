import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();

  const deletedHost = await prisma.host.deleteMany({
    where: { id },
  });

  if (deletedHost.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteHostById;
