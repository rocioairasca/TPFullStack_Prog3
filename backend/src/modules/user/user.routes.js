const express = require("express");
const userService = require("./user.service");
const checkJwt = require('./config/auth');

const router = express.Router();

// GET /api/user
router.get("/api/user", checkJwt, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// GET /api/user/:id
router.get("/api/user/:id", checkJwt, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.findUserById(userId);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;