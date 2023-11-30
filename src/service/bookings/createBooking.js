import { PrismaClient } from "@prisma/client";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingstatus
) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.create({
    data: {
      userId: {
        connect: { id: userId },
      },
      property: {
        connect: { id: propertyId },
      },
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingstatus,
    },
  });

  return booking;
};

export default createBooking;
