const Responder = require("../shared/responder");

module.exports = (...roles) => {
  return async (req, res, next) => {
    const responder = new Responder(res);
    try {
      const role = req.user.role;
      if (!role)
        return responder.unauthorized({
          message: "No roles available for this user",
        });
      if (!roles.includes(role))
        return responder.unauthorized({ message: "Permission denied" });
      next();
    } catch (e) {
      console.log(e);
      return responder.crash();
    }
  };
};
