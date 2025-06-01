const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      console.log(requiredRoles);
      userRoles = req.user.role;
      console.log(userRoles);

      if (!userRoles.some(({ name }) => requiredRoles.includes(name))) {
        return res.status(403).json({ message: "Ruxsat yo'q" });
      }

      next();
    } catch (error) {
      sendErrorResponse(error, res, 403);
    }
  };
};
