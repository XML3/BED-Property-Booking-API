import { PrismaClient } from "@prisma/client";

const updateAvgRating = async (propertyId) => {
  const prisma = new PrismaClient();

  const filterAvgRating = await prisma.review.groupBy({
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

  const updatedPropRating = await prisma.property.updateMany({
    where: {
      id: propertyId,
    },
    data: {
      rating: Math.round(filterAvgRating[0]._avg.rating || 0), //access groupBy operation
    },
  });

  const updatedPropAfterRate = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
    select: {
      rating: true,
    },
  });
  return updatedPropAfterRate ? updatedPropAfterRate.rating : 0; //without this conditional check, the app will return Error 500 in Create Reviews section
};

export default updateAvgRating;

//This is exta and not required in project:
//This handles the update of avg rates calculated from Reviews for each Property
