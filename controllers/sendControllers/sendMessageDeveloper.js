const { sendEmail } = require("../../helpers");

const sendDeveloperMessage = async (req, res) => {
  const { email, name, message } = req.body;

  const text = `От: ${name}.
 Email: ${email}.
 ${message}
 `;

  const subject = "Сообщение от пользователя";

  await sendEmail({ to: email, text, subject });

  res.status(201).json({ message: "sended" });
};

module.exports = sendDeveloperMessage;
