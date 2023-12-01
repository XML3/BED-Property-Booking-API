import { PrismaClient } from "@prisma/client";

const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const deletedProperty = await prisma.property.deleteMany({
    where: { id },
  });

  if (deletedProperty.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteProperty;
