import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { amenities } = amenityData;
  const { hosts } = hostData;
  const { users } = userData;
  const { properties } = propertyData;
  const { reviews } = reviewData;
  const { bookings } = bookingData;

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        profilePicture: host.profilePicture,
        aboutMe: host.aboutMe,
      },
    });
  }

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        reviews: {
          connect: user.reviews
            ? user.reviews.map((reviewId) => ({ id: reviewId }))
            : [],
        },
        bookings: {
          connect: user.bookings
            ? user.bookings.map((bookingId) => ({ id: bookingId }))
            : [],
        },
      },
    });
  }

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
        host: {
          connect: { id: property.hostId },
        },
        amenities: {
          connect: property.amenities
            ? property.amenities.map((amenityId) => ({ id: amenityId }))
            : [],
        },
        bookings: {
          connect: property.bookings
            ? property.bookings.map((bookingId) => ({ id: bookingId }))
            : [],
        },
        reviews: {
          connect: property.reviews
            ? property.reviews.map((reviewId) => ({ id: reviewId }))
            : [],
        },
      },
    });
  }

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        property: {
          connect: { id: review.propertyId },
        },
        user: {
          connect: { id: review.userId },
        },
      },
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
        user: {
          connect: { id: booking.userId },
        },
        property: {
          connect: { id: booking.propertyId },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
