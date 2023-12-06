import { PrismaClient } from "@prisma/client";

const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const reviewDeleted = await prisma.review.deleteMany({
    where: { id },
  });

  if (reviewDeleted.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteReview;
