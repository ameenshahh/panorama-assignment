const { User } = require("../../models");

module.exports = async ({ email }) => {
  try {
    const existingUser = await User.findOne({ email }).exec();
    return existingUser;
  } catch (error) {
    throw error;
  }
};
