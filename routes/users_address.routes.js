const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/user_address.controller");
const authGuard = require("../middleware/guards/auth.guard");
const roleGuard = require("../middleware/guards/role.guard");
const selfGuard = require("../middleware/guards/self.guard");

const router = require("express").Router();

router.post("/", create);
router.get("/", authGuard, roleGuard(["admin", "user"]), getAll);
router.get("/:id", authGuard, selfGuard, getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
