import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getProperties from "../src/service/properties/getProperties.js";
import createProperty from "../src/service/properties/createProperty.js";
import deleteProperty from "../src/service/properties/deletePropById.js";
import getPropertyById from "../src/service/properties/getPropById.js";
import updatePropertyById from "../src/service/properties/updatePropById.js";

const router = express.Router();

//GET: all properties
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const properties = await getProperties(location, pricePerNight, amenities);
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Property
router.post("/", authMiddleware, async (req, res, next) => {
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
    res.status(201).json(newProperty);
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
router.get("/:id", async (req, res, next) => {
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
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
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

    const updatedProperty = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });

    if (updatedProperty) {
      res.status(200).send({
        message: `Property with id ${id} successfully updated!`,
        updatedProperty,
      });
    } else {
      res.status(404).json({ message: `Property with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
