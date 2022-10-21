const router = require("express").Router();

const {
  getAllUser,
  login,
  signup,
  updateUrl,
  getUserById,
} = require("../controllers/user");

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/get-user-by-id", getUserById);
router.put("/update-url", updateUrl);
module.exports = router;
