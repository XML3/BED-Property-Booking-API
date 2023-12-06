import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();

  // const { userId, propertyId, ...rest } = updatedBooking;

  const booking = await prisma.booking.updateMany({
    where: { id },
    data: updatedBooking,
  });

  if (booking.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default updateBookingById;
