export default {
  secretKey: process.env.SECRET_KEY || "customjirasecretkey",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  mailerUser: process.env.MAILER_USER || "dummy@account.com",
  mailerPass: process.env.MAILER_PASS || "sendpulseaccountpassword"
};
