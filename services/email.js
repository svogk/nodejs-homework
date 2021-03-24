const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");

require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }

  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "System HW-email",
        link: this.link,
      },
    });
    const template = {
      body: {
        name,
        intro:
          "Добро пожаловать в System HW-email! Мы очень рады видеть вас на борту.",
        action: {
          instructions: "Чтобы закончить регистрацию кликните на кнопку",
          button: {
            color: "#22BC66",
            text: "Подтвердить свой аккаунт",
            link: `${this.link}/api/users/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Нужна помощь или есть вопросы? Просто ответьте на это письмо, мы будем рады помочь.",
      },
    };
    return mailGenerator.generate(template);
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "worksvogk@i.ua",
      subject: "Подтверждение регистрации",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
