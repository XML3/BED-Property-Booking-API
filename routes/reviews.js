import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getReviews from "../src/service/reviews/getReviews.js";
import createReview from "../src/service/reviews/createReview.js";
import deleteReview from "../src/service/reviews/deleteReviewById.js";
import getReviewById from "../src/service/reviews/getReviewById.js";
import updateReviewById from "../src/service/reviews/updateReviewById.js";
import getAvgRating from "../src/service/reviews/getAvgRating.js";
import updateAvgRating from "../src/service/reviews/updateAvgRating.js";

const router = express.Router();

//GET all Reviews
router.get("/", async (req, res, next) => {
  const { userId, propertyId } = req.query;
  try {
    const reviews = await getReviews(userId, propertyId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Review
router.post("/", authMiddleware, async (req, res, next) => {
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
        message: ` Review with id ${id} was successfully deleted!`,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET Review by ID
router.get("/:id", async (req, res, next) => {
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
    const { rating, comment } = req.body;

    const updatedReview = await updateReviewById(id, {
      rating,
      comment,
    });

    if (updatedReview) {
      res.status(200).send({
        message: `Review with id ${id} successfully updated!`,
        updatedReview,
      });
    } else {
      res.status(404).json({ message: `Review with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

//==================================================================================================
// This section is for the Average Rate of a property based on the rate in Reviews (Not a Requirement For this project)
//GET Avarage Reviews
router.get("/getAvgRating/:propertyId", async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const avgRatings = await getAvgRating(propertyId);
    res.status(200).json(avgRatings);
  } catch (error) {
    next(error);
  }
});

//PUT Average Rating
router.put("/updateAvgRating/:propertyId", async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const updatedPropertyRate = await updateAvgRating(propertyId);
    res.status(200).json(updatedPropertyRate);
  } catch (error) {
    next(error);
  }
});

export default router;
