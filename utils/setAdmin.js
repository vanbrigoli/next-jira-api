import UserModel from "../model/UserModel";
import appConfig from "../config/app";

const setAdmin = () => {
  UserModel.findOne({ role: "admin" }, function(err, user) {
    if (err) {
      console.error("Error: ", err);
      return;
    }

    if (!user) {
      const adminUser = new UserModel();

      adminUser.password = appConfig.adminPassword;
      adminUser.email = "admin@admin.com";
      adminUser.role = "admin";

      adminUser.save(function(err) {
        if (err) throw err;

        return;
      });
    } else {
      if (!user.comparePassword(appConfig.adminPassword)) {
        user.updateOne(
          { password: user.generateHash(appConfig.adminPassword) },
          function(err) {
            if (err) throw err;

            return;
          }
        );
        return;
      }
    }
  });
};

export default setAdmin;
