const categoryRouter = require("./category.routes");
const regionRouter = require("./region.routes");
const districtRouter = require("./district.routes");
const commissionRouter = require("./commission.routes");
const statusRouter = require("./status.routes");
const usersRouter = require("./users.routes");
const userAddressRouter = require("./users_address.routes");
const machineRouter = require("./machine.routes");
const imageRouter = require("./image.routes");
const roleRouter = require("./role.routes");
const userRoleRouter = require("./user-role.routes");
const authRouter = require("./auth.routes");
const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/commission", commissionRouter);
router.use("/status", statusRouter);
router.use("/users", usersRouter);
router.use("/user-address", userAddressRouter);
router.use("/machine", machineRouter);
router.use("/image", imageRouter);
router.use("/roles", roleRouter);
router.use("/user-role", userRoleRouter);

module.exports = router;
