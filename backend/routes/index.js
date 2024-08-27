const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/usercontroller");

router.post("/createUser", createUser);
router.post("/login", login);
router.get("/users", getAllUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
