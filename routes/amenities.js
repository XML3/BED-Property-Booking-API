import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getAmenities from "../src/service/amenities/getAmenities.js";

const router = express.Router();

//GET All Amenities
router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.status(200).json(amenities);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Amenity

export default router;
