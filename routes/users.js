import express from "express";
import authMiddleware from "../src/middleware/auth.js";
import getUsers from "../src/service/users/getUsers.js";
import createUser from "../src/service/users/createUser.js";
import deleteUser from "../src/service/users/deleteUserById.js";
import getUserById from "../src/service/users/getUserById.js";
import updateUserById from "../src/service/users/updateUserById.js";

const router = express.Router();

//Get All Users
router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

//POST: Create New User
router.post("/", async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

//DELETE: User by ID
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUserById = await deleteUser(id);

    if (!deleteUserById) {
      res.status(404).send(`User with id ${id} was not found!`);
    } else {
      res
        .status(200)
        .json({ message: `User with id ${deleteUserById} was deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

//GET: User by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res
        .status(404)
        .send({ message: `User with id ${id} was not found!`, user });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

//PUT: Update User by ID
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const user = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    });

    if (!user) {
      res.status(404).send({ message: `User with id ${id} was not found!` });
    } else {
      res
        .status(200)
        .send({ message: `User with id ${id} successfully updated`, user });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
