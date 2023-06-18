const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendEmail = async (to, emailHtml, subject) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject,
    html: emailHtml,
  });
};

module.exports = sendEmail;
