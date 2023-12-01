import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getAmenities from "../src/service/amenities/getAmenities.js";
import createAmenity from "../src/service/amenities/createAmenity.js";

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
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

export default router;
