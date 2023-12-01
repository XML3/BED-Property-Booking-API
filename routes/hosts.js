import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getHosts from "../src/service/hosts/getHosts.js";
import createHost from "../src/service/hosts/createHost.js";

const router = express.Router();

//GET All Hotst
router.get("/", async (req, res, next) => {
  try {
    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

//POST: Create New Host
router.post("/", async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    next(error);
  }
});

export default router;
