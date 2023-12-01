import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();

  const deletedAmenity = await prisma.amenity.deleteMany({
    where: { id },
  });

  if (deletedAmenity.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteAmenityById;
