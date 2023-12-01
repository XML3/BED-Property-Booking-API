import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getReviews from "../src/service/reviews/getReviews.js";
import createReview from "../src/service/reviews/createReview.js";
import deleteReview from "../src/service/reviews/deleteReviewById.js";
import getReviewById from "../src/service/reviews/getReviewById.js";
import updateReviewById from "../src/service/reviews/updateReviewById.js";

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

//GET Review by ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewById = await getReviewById(id);

    if (!reviewById) {
      res.status(404).send(`Review with id ${id} not found!`);
    } else {
      res.status(200).json(reviewById);
    }
  } catch (error) {
    next(error);
  }
});

//UPDATE: Review by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;

    const review = await updateReviewById(id, {
      userId,
      propertyId,
      rating,
      comment,
    });

    if (review) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated!`,
        review,
      });
    } else {
      res.status(404).json({ message: `Review with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
