const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next(new ErrorResponse("Passwords did not match", 400));
    }
    try {
      const user = await User.create({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const token = generateToken(user);
      res
        .cookie("xs", token, {
          sameSite: "lax",
          path: "/",
          httpOnly: true,
        })
        .json({
          user,
          token,
        });
      return;
    } catch (err) {
      next(err);
    }
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const verified = await bcrypt.compare(password, user.password);
      if (verified) {
        const token = generateToken(user);
        res
          .cookie("xs", token, {
            sameSite: "lax",
            path: "/",
            httpOnly: true,
          })
          .json({
            user,
            token,
          });
        return;
      }
      return next(new ErrorResponse("Incorect Password", 401));
    }
    return next(new ErrorResponse("Wrong Credentials", 400));
  } catch (error) {
    next(error);
  }
};
exports.getAuthState = async (req, res, next) => {
  try {
    const xs = req.cookies.xs;
    if (xs) {
      try {
        const verified = jwt.verify(xs, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        req.user = user;
        return res.json({
          user,
        });
      } catch (error) {
        console.log("clearing cookie");
        return res.clearCookie("xs").json({user:undefined});
      }
    }
    return res.json({user:undefined})
  } catch (error) {
    next(error);
  }
};

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}
