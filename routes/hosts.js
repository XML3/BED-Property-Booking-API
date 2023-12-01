import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getHosts from "../src/service/hosts/getHosts.js";
import createHost from "../src/service/hosts/createHost.js";
import deleteHostById from "../src/service/hosts/deleteHostById.js";
import getHostById from "../src/service/hosts/getHostById.js";
import updateHostById from "../src/service/hosts/updateHostById.js";

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

//DELETE: Host by ID
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteHost = await deleteHostById(id);

    if (!deleteHost) {
      res.status(404).send(`Host with id ${id} not found!`);
    } else {
      res
        .status(200)
        .json({ message: `Host with id ${deleteHost} was deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

//GET: Host by ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const hostId = await getHostById(id);

    if (!hostId) {
      res.status(404).send({ message: `Host with id ${id} not found!` });
    } else {
      res.status(200).json(hostId);
    }
  } catch (error) {
    next(error);
  }
});

//PUT: Update Host by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const host = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (!host) {
      res.status(404).send({ message: `Host with id ${id} not found!` });
    } else {
      res
        .status(200)
        .send({ message: `Host with id ${id} successfully updated!`, host });
    }
  } catch (error) {
    next(error);
  }
});
export default router;
