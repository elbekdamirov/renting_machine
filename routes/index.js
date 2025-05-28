const categoryRouter = require("./category.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");
const commissionRouter = require("./commission.routes");
const statusRouter = require("./status.routes");
const router = require("express").Router();

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/commission", commissionRouter);
router.use("/status", statusRouter);

module.exports = router;
