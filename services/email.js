const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const pug = require("pug");
const HtmlToPug = require("html-to-text");
module.exports = class Email {
  constructor(user, url) {
    (this.size = user.size),
      (this.to = user.receiver),
      (this.url = url),
      (this.firstname = user.filename),
      (this.from = `rishabh mathur <${process.env.USER}>`);
  }
  nodeTransport() {
    return nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }
  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstname: this.firstname,
      url: this.url,
      size: this.size,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: HtmlToPug.fromString(html),
    };
    await this.nodeTransport().sendMail(mailOptions);
  }
  async link() {
    await this.send("welcome", "Download File");
  }
};
