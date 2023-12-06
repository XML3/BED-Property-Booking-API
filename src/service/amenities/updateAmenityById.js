import { PrismaClient } from "@prisma/client";

const updateAmenityById = async (id, updatedAmenity) => {
  const prisma = new PrismaClient();

  const amenityUpdated = await prisma.amenity.updateMany({
    where: { id },
    data: updatedAmenity,
  });

  if (amenityUpdated.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateAmenityById;
