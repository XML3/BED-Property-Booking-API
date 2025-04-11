import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();

  const propertyUpdate = await prisma.property.update({
    where: { id },
    data: {
      ...updatedProperty,
      amenities: {
        connect: updatedProperty.amenities || [],
        disconnect: updatedProperty.amenitiesToRemove || [],
      },
    },
  });

  if (propertyUpdate) {
    return id;
  } else {
    return null;
  }
};

export default updatePropertyById;
