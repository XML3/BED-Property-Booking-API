import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getProperties from "../src/service/properties/getProperties.js";

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

export default router;
