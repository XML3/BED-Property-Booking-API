import { PrismaClient } from "@prisma/client";

const getAvgRating = async (propertyId) => {
  const prisma = new PrismaClient();

  const avgRating = await prisma.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    where: {
      propertyId: {
        equals: propertyId,
      },
    },
  });

  return avgRating;
};

export default getAvgRating;

//This is exta and not required in project:
// It gets the avg rating from Reviews for each Property
