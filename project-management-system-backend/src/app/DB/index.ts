import bcrypt from "bcrypt";

import config from "../config";
import { USER_ROLE } from "../module/user/user.constant";
import { User } from "../module/user/user.model";

const superAdmin = {
  name: "Md Jewel Rana",

  email: "superAdmin@gmail.com",

  password: "123456",

  role: USER_ROLE.superAdmin,

  status: "active",

  isVerified: true,

  isDeleted: false,

  department: "Management",

  designation: "System Administrator",

  skills: ["Management", "System Design", "Leadership"],
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExists) {
    await User.create(superAdmin);

    console.log("✅ Super Admin created successfully");
  } else {
    console.log("⚠️ Super Admin already exists");
  }
};

export default seedSuperAdmin;
