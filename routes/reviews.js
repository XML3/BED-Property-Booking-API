import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getReviews from "../src/service/reviews/getReviews.js";
import createReview from "../src/service/reviews/createReview.js";

const router = express.Router();

//GET all Reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Review
router.post("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const review = await createReview(userId, propertyId, rating, comment);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

//DELETE: Review by ID
export default router;
