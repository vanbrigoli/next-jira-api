export default {
  secretKey: process.env.SECRET_KEY || "customjirasecretkey",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  mailerUser: process.env.MAILER_USER || "f4a2fbf0733292",
  mailerPass: process.env.MAILER_PASS || "72f1f04bd843ed",
  mailerHost: process.env.MAILER_HOST || "smtp.mailtrap.io",
  mailerPort: process.env.MAILER_PORT || 2525
};
