import UserModel from "../model/UserModel";

const setAdmin = () => {
  UserModel.findOne({ role: "admin" }, function(err, user) {
    if (err) {
      console.error("Error: ", err);
      return;
    }

    if (!user) {
      const adminUser = new UserModel();
      const adminPassword = process.env.ADMIN_PASSWORD || "admin";

      adminUser.password = adminUser.generateHash(adminPassword);
      adminUser.email = "admin@admin.com";
      adminUser.role = "admin";

      adminUser.save(function(err) {
        if (err) throw err;

        return;
      });
    }
    return;
  });
};

export default setAdmin;
