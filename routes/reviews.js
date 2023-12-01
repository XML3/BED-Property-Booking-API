import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getReviews from "../src/service/reviews/getReviews.js";

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
export default router;
