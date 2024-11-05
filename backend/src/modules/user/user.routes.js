const express = require("express");
const userService = require("./user.service");
const { checkJwt } = require('../../../config/auth');

const router = express.Router();

// GET /api/user
router.get("/api/user", checkJwt, async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;