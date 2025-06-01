const {
  create,
  getAll,
  getOne,
  remove,
  update,
  getCancelledContracts,
} = require("../controllers/contract.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/", getAll);
router.get("/getCancelled", getCancelledContracts);
router.get("/:id", getOne);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
