const jwt = require("jsonwebtoken");

const authorized = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  // console.log(authorizationHeader);
  if (!authorizationHeader) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed",
    });
    return;
  }
  // check header
  try {
    const token = authorizationHeader.split("Bearer ")[1];
    const verifyToken = jwt.verify(token, process.env.jwt_salt);
    // console.log(verifyToken);
    req.user = verifyToken;
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed Invalid",
    });
    return;
  }
  // console.log(token);
  next();
};

module.exports = authorized;
