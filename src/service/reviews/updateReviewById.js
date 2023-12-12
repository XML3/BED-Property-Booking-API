import { PrismaClient } from "@prisma/client";
import updateAvgRating from "./updateAvgRating.js";

const prisma = new PrismaClient();

const updateReviewById = async (id, updatedReview) => {
  const prisma = new PrismaClient();

  const reviewUpdated = await prisma.review.updateMany({
    where: { id },
    data: updatedReview,
  });

  //call updateAvgRating function
  const propertyId = updatedReview.propertyId;
  if (propertyId) {
    await updateAvgRating(propertyId);
  } else {
    console.error(`Property ID is undefined in updatedReview:`, updatedReview);
  }
  if (reviewUpdated.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateReviewById;
