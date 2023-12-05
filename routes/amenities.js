import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getAmenities from "../src/service/amenities/getAmenities.js";
import createAmenity from "../src/service/amenities/createAmenity.js";
import deleteAmenityById from "../src/service/amenities/deleteAmenityById.js";
import getAmenityById from "../src/service/amenities/getAmenityById.js";
import updateAmenityById from "../src/service/amenities/updateAmenityById.js";

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

// DELETE: Amenity by ID
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteAmenity = await deleteAmenityById(id);

    if (!deleteAmenity) {
      res.status(404).send(`Amenity with id ${id} not found!`);
    } else {
      res
        .status(200)
        .json({ message: `Amenity with id ${deleteAmenity} was deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

//GET: Amenity by ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenityId = await getAmenityById(id);

    if (!amenityId) {
      res.status(404).send({ message: `Amenity with id ${id} not found!` });
    } else {
      res.status(200).json(amenityId);
    }
  } catch (error) {
    next(error);
  }
});

//PUT: Update Amenity by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedAmenity = await updateAmenityById(id, { name });

    if (updatedAmenity) {
      res.status(200).json({
        message: `Amenity with id ${id} successfully updated!`,
      });
    } else {
      res.status(404).json({ message: `Amenity with id ${id} not found!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
