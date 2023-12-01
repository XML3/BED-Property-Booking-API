import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();

  const amenityUpdated = await prisma.amenity.update({
    where: { id },
    data: updatedAmenity.name,
  });

  if (amenityUpdated) {
    return id;
  } else {
    return null;
  }
};

export default updateAmenityById;
