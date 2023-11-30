import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getBookings from "../src/service/bookings/getBookings.js";

const router = express.Router();

//GET: All Bookings
router.get("/", async (req, res, next) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Booking
