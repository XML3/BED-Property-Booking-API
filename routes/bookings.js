import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getBookings from "../src/service/bookings/getBookings.js";
import createBooking from "../src/service/bookings/createBooking.js";
import deleteBooking from "../src/service/bookings/deleteBookingById.js";
import getBookingById from "../src/service/bookings/getBookingById.js";
import updateBookingById from "../src/service/bookings/updateBookingById.js";

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
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    next(error);
  }
});

//DELETE: Booking by ID
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteBookingById = await deleteBooking(id);

    if (!deleteBookingById) {
      res.status(404).send(`Booking with id ${id} was not found`);
    } else {
      res
        .status(200)
        .json({ message: `Booking with id ${deleteBookingById} was deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

//GET: Booking By ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).send(`Booking with id ${id} was not found!`);
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

//UPDATE: bookings by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    const updatedBooking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (updatedBooking) {
      res.status(200).send({
        message: `Booking with id ${id} successfully updated!`,
        updatedBooking,
      });
    } else {
      res.status(404).json({ message: ` Booking with id ${id} not found! ` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
