const fs = require("fs").promises;
const path = require("path");
const handlebars = require("handlebars");
const { User, UserWord } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { BASE_URL } = process.env;

const dataTranslation = {
  ru: {
    buttonTitle: "Подтвердите адрес почты",
    text: "Вы получили это сообщение, так как недавно зарегистрировали учетную запись на сайте LEARN ENGLISH WORDS. Для использования всех функций сайта Подтвердите свой адрес электронной почты, нажав на кнопку ниже.",
    welcomeText: "Привет",
    subject: "Активируйте электронную почту для LEARN ENGLISH WORDS",
  },
  pl: {
    buttonTitle: "Potwierdź email",
    text: "Otrzymałeś tę wiadomość, ponieważ niedawno założyłeś konto na LEARN ENGLISH WORDS. Aby korzystać ze wszystkich funkcji serwisu Potwierdź swój adres e-mail, klikając przycisk poniżej.",
    welcomeText: "Witaj",
    subject: "Aktywuj e-mail dla LEARN ENGLISH WORDS",
  },
  ua: {
    buttonTitle: "Підтвердити електронну адресу",
    text: "Ви отримали це повідомлення, оскільки нещодавно зареєстрували обліковий запис на LEARN ENGLISH WORDS. Щоб користуватися всіма функціями сайту підтвердьте свою електронну адресу, натиснувши кнопку нижче.",
    welcomeText: "Привіт",
    subject: "Активуйте електронну пошту для LEARN ENGLISH WORDS",
  },
  en: {
    buttonTitle: "Confirm email",
    text: "You received this message because you recently registered for an account on LEARN ENGLISH WORDS. To use all the functions of the site Confirm your email address by clicking the button below.",
    welcomeText: "Welcome",
    subject: "Activate email for LEARN ENGLISH WORDS",
  },
};

const register = async (req, res) => {
  const { email, password, language = "en", name } = req.body;

  if (await User.findOne({ email })) {
    const errorMessage = {
      ru: `Почта ${email} уже используется`,
      pl: `Poczta ${email} jest już używana`,
      ua: `Пошта ${email} вже використовується`,
      en: `Mail ${email} is already in use`,
    };

    throw HttpError(409, errorMessage[language]);
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  const verificationCode = v4();

  const createUser = await User.create({
    ...req.body,
    password: passwordHashed,
    verificationCode,
    statistic: {
      correctAnswers: 0,
      incorrectAnswers: 0,
    },
  });

  await UserWord.create({ owner: createUser._id });

  const templatePath = path.join(
    __dirname,
    "../../mailTemplates/ConfirmEmail.html"
  );
  const htmlReading = await fs.readFile(templatePath, "utf8");
  const template = handlebars.compile(htmlReading);
  const linkVerify = `${BASE_URL}/api/auth/verify/${verificationCode}/`;

  await sendEmail({
    to: createUser.email,
    emailHtml: template({
      linkVerify,
      buttonTitle: dataTranslation[language].buttonTitle,
      text: dataTranslation[language].text,
      welcomeText: dataTranslation[language].welcomeText,
      userName: name,
    }),
    subject: dataTranslation[language].subject,
  });

  res.status(201).json({ name: createUser.name, email: createUser.email });
};

module.exports = register;
