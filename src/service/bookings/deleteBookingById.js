import { PrismaClient } from "@prisma/client";

const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const deletedBooking = await prisma.booking.deleteMany({
    where: { id },
  });

  if (deletedBooking.count > 0) {
    return id;
  } else {
    return null;
  }
};

export default deleteBooking;
