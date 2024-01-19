import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();

  const properties = await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight: {
        equals: pricePerNight,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      pricePerNight: true,
      bedroomCount: true,
      bathRoomCount: true,
      maxGuestCount: true,
      hostId: true,
      rating: true,
    },
  });

  return properties;
};

export default getProperties;
