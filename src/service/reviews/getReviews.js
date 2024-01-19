import { PrismaClient } from "@prisma/client";

const getReviews = async (userId, propertyId) => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({
    where: {
      userId: {
        contains: userId,
      },
      propertyId: {
        contains: propertyId,
      },
    },
    select: {
      id: true,
      userId: true,
      propertyId: true,
      rating: true,
      comment: true,
    },
  });

  return reviews;
};

export default getReviews;

//it is working now after adding "select"
