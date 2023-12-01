import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const { userId, propertyId, ...rest } = updatedReview;

  const reviewUpdated = await prisma.review.update({
    where: { id },
    data: {
      user: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      ...rest,
    },
  });

  return reviewUpdated;
};

export default updateReviewById;
