const { sendEmail } = require("../../helpers");
const { EMAIL_DEVELOPER } = process.env;

const sendDeveloperMessage = async (req, res) => {
  const { email, name, message } = req.body;

  const text = `От: ${name}.
 Email: ${email}.
 ${message}
 `;

  const subject = "Сообщение от пользователя";

  await sendEmail({ to: EMAIL_DEVELOPER, text, subject });

  res.status(201).json({ message: "sended" });
};

module.exports = sendDeveloperMessage;
