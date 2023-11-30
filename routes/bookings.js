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
router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkinDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).json(newBooking);
  } catch (error) {
    next(error);
  }
});

//DELETE: Booking by ID
