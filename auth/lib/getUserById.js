const { User } = require("../../models");
module.exports = async (id) => {
  try {
    let user;

    user = await User.findOne({ _id: id }).exec();
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
