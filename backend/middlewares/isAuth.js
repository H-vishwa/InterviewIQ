// To check whether user is authorized or not
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new ApiError(401, "Authentication token is missing. Please log in.");
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtErr) {
      throw new ApiError(401, "Invalid or expired session token. Please log in again.");
    }

    if (!verifyToken?.userId) {
      throw new ApiError(401, "Token payload is invalid");
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
