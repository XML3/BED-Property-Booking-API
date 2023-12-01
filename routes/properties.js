import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getProperties from "../src/service/properties/getProperties.js";
import createProperty from "../src/service/properties/createProperty.js";

const router = express.Router();

//GET: all properties
router.get("/", async (req, res, next) => {
  try {
    const properties = await getProperties();
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Property
router.post("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(200).json(newProperty);
  } catch (error) {
    next(error);
  }
});

//DELETE: Property by ID

export default router;
