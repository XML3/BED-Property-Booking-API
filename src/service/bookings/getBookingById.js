import { PrismaClient } from "@prisma/client";

const getBookingById = async (id) => {
  const prisma = new PrismaClient();
  const booking = prisma.booking.findUnique({
    where: { id },
  });

  return booking;
};

export default getBookingById;
