const { User } = require("../../models");
const { hash } = require("./password");

module.exports = async ({ name,email, password }) => {
  try {
    const newUser = await User.create({
      name,
      email,
      password: hash(password),
    });

    return newUser;
  } catch (error) {
    console.log(error)
    throw error;
  }
};
