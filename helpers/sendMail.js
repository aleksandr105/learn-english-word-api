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

const sendEmail = async (to, link) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: "Activate email for LEARN ENGLISH WORDS",
    html: `
   <div>
   <h1>Click on the link to activate e-mail</h1>
   <a href="${link}" target="_blank">LEARN ENGLISH WORDS ACTIVATE</a>
   </div> 
   `,
  });
};

module.exports = sendEmail;
