const Responder = require("../shared/responder");
const checkExistingUser = require("./lib/checkExistingUser");
const createUser = require("./lib/createUser");

module.exports = async (req, res) => {
  const responder = new Responder(res);

  let { name, email, password } = req.body;

  try {
    // Checking for existing user
    const existingUser = await checkExistingUser({ email });

    if (existingUser) {
      responder.error({
        message: "User already exists",
      });
    }

    let createdUser = await createUser({ name, email, password });

    if (createdUser) {
      responder.success({
        message: "Sign up successful",
        payload: createdUser,
      });
    }
  } catch (error) {
    console.log(error)
    responder.error({
      message: error.message,
    });
  }
};
