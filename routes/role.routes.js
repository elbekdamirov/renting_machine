const {
  create,
  getAll,
  getOne,
  remove,
  update,
} = require("../controllers/role.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
