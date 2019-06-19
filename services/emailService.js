import nodemailer from "nodemailer";

class Mailer {
  constructor(service, auth) {
    this.service = service;
    this.auth = auth;
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
      host: this.service.host,
      port: this.service.port,
      auth: this.auth
    });
  }
}

export default Mailer;
