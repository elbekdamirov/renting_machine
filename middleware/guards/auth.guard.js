const { sendErrorResponse } = require("../../helpers/send_error_response");
const { jwtService } = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return sendErrorResponse(
        { message: "Authorization Header Not Found" },
        res,
        401
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return sendErrorResponse({ message: "Token Not Found" }, res, 401);
    }

    const decodedToken = await jwtService.verifyAccessToken(token);
    req.user = decodedToken;

    next();
  } catch (error) {
    sendErrorResponse(error, res, 403);
  }
};
