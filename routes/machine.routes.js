const {
  create,
  getAll,
  getOne,
  remove,
  update,
  selectByRegion,
  selectByImageCount,
} = require("../controllers/machine.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.post("/getByAddress", selectByRegion);
router.post("/selectByImageCount", selectByImageCount);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
