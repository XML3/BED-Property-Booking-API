import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const propertyUpdate = await prisma.property.updateMany({
    where: { id },
    data: updatedProperty,
  });

  if (propertyUpdate.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updatePropertyById;
