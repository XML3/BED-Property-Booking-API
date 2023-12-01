import { PrismaClient } from "@prisma/client";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const reviewDeleted = await prisma.review.delete({
    where: { id },
  });

  return reviewDeleted;
};

export default deleteReview;
