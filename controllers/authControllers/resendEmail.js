const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, `Email ${email} not registered`);

  if (user.isVerify) throw HttpError(403, `Email ${email} already verified`);

  await sendEmail(
    email,
    `${BASE_URL}/api/auth/verify/${user.verificationCode}/`
  );

  res.json({ message: "Email sent again" });
};

module.exports = resendEmail;
