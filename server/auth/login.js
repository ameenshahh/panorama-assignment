const { User } = require("../models");
const jwtUtil = require("./lib/jwt");
const passUtil = require("./lib/password");
const getUserById = require("./lib/getUserById");
const Responder = require("../shared/responder");

module.exports = async (req, res) => {
  const responder = new Responder(res);

  // Password ReHashing
  let password;
  try {
    password = passUtil.hash(req.body.password);
  } catch (e) {
    return responder.crash();
  }

  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return responder.unauthorized({ message: "User not found" });
    }

    // checking password
    if (user.password != password) {
      return responder.unauthorized({ message: "Invalid credentials" });
    }

    // Generate Tokens
    let accessToken = jwtUtil.sign({
      id: user.id,
    });

    let userData = await getUserById(user.id);

    return responder.success({
      payload: {
        login_status: userData ? true : false,
        accessToken,
      },
    });
  } catch (e) {
    return responder.crash();
  }
};
