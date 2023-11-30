import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const login = async (username, password) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });
  // musst add username and password in conditional statement, or it will give token without these present. Safety issue
  if (!username || !password || !user) {
    return null;
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  return token;
};

export default login;
