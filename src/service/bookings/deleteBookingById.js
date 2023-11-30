import { PrismaClient } from "@prisma/client";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();
  const booking = prisma.booking.deleteMany({
    where: { id },
  });

  if (booking.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteBooking;
