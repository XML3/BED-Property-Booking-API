import { PrismaClient } from "@prisma/client";
import updateAvgRating from "./updateAvgRating.js";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const newReview = await prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  //call updateAvgRating function

  await updateAvgRating(propertyId);

  return newReview;
};

export default createReview;
