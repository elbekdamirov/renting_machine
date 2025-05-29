const categoryRouter = require("./category.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");
const commissionRouter = require("./commission.routes");
const statusRouter = require("./status.routes");
const usersRouter = require("./users.routes");
const userAddressRouter = require("./users_address.routes");
const machineRouter = require("./machine.routes");
const imageRouter = require("./image.routes");
const router = require("express").Router();

router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/commission", commissionRouter);
router.use("/status", statusRouter);
router.use("/users", usersRouter);
router.use("/user-address", userAddressRouter);
router.use("/machine", machineRouter);
router.use("/image", imageRouter);

module.exports = router;
