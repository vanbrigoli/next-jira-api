import nodemailer from "nodemailer";

class Mailer {
  constructor(config) {
    this.config = config;
  }

  sendMail(options) {
    const transporter = this.createTransporter();
    transporter.sendMail(options, function(err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      auth: {
        user: this.config.user,
        pass: this.config.pass
      }
    });
  }
}

export default Mailer;
