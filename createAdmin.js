// const bcrypt = require("bcrypt");
// const User = require("./models/User");
// const { sequelize } = require("./config/database");

// async function createAdmin() {
//     await sequelize.sync();

//     const hashedPassword = await bcrypt.hash("1234578njnec", 10);

//     await User.create({
//         fullName: "Njoku-Emmanuel",
//         email: "njoku4663@gmail.com",
//         phone: "0916 958 1070",
//         password: hashedPassword,
//         role: "admin"
//     });

//     console.log("Admin created");
//     process.exit();
// }

// createAdmin();