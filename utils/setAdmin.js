import UserModel from "../model/UserModel";

const setAdmin = () => {
  UserModel.findOne({ role: "admin" }, function(err, user) {
    // if there are any errors, return the error before anything else
    if (err) console.error("Error", err);

    // if no user is found
    if (!user) {
      const adminUser = new UserModel();

      adminUser.password = adminUser.generateHash("admin");
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
