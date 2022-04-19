const jwt = require("jsonwebtoken");
const ErrorResponse = require("./errorResponse");

module.exports = (req,next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (error) {
        next(new ErrorResponse("Invalid/Expired Token", 401))
        return false
      }
    }
    console.log("here")
    next(new ErrorResponse("Header should be like `Bearer [validtoken]`", 400));
    return false
  }
  next(new ErrorResponse("Action not allowed`", 401));
  return false
};
