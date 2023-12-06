import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const reviewUpdated = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  if (reviewUpdated.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateReviewById;
