import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getProperties from "../src/service/properties/getProperties.js";
import createProperty from "../src/service/properties/createProperty.js";
import deleteBooking from "../src/service/bookings/deleteBookingById.js";
import deleteProperty from "../src/service/properties/deletePropById.js";
import getPropertyById from "../src/service/properties/getPropById.js";

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
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePropertyById = await deleteProperty(id);

    if (!deletePropertyById) {
      res.status(404).send(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Property with id ${deletePropertyById} was deleted! `,
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET: Property By ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).send(`Property with id ${id} was not found!`);
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

//UPDATE: Property by ID
export default router;
