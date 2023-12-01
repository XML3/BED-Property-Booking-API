import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, updatedHost) => {
  const prisma = new PrismaClient();

  const hostUpdated = await prisma.host.updateMany({
    where: { id },
    data: updatedHost,
  });

  if (hostUpdated.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateHostById;
