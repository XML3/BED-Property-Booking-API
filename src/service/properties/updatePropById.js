import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const propertyUpdate = await prisma.property.update({
    where: { id },
    data: updatedProperty,
  });

  return propertyUpdate;
};

export default updatePropertyById;
