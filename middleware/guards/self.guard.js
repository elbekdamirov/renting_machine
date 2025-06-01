const { sendErrorResponse } = require("../../helpers/send_error_response");

module.exports = (req, res, next) => {
  try {
    console.log(req.user);

    if (req.params.id != req.user.id) {
      return res.status(403).send({
        message:
          "Ruxsat etilmagan foydalanuvchi. Faqat shaxsiy ma'lumotlarni ko'rish mumkin",
      });
    }

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
