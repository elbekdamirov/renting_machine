const {
  create,
  getAll,
  getOne,
  remove,
  update,
  selectByTime,
} = require("../controllers/users.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.post("/getByTime", selectByTime);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
