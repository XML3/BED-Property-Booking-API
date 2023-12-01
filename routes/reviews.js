import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getReviews from "../src/service/reviews/getReviews.js";
import createReview from "../src/service/reviews/createReview.js";
import deleteReview from "../src/service/reviews/deleteReviewById.js";

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
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

//DELETE: Review by ID
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReviewById = await deleteReview(id);

    if (!deletedReviewById) {
      res.status(404).send(`Review with id ${id} not found! `);
    } else {
      res.status(200).json({
        message: ` Review with id ${deletedReviewById} was successfully deleted!`,
      });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
