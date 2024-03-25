import jwt from "jsonwebtoken";
import { ApiError, AsyncHandler } from "../utils/index.js";
import { User } from "../models/user.model.js";

const verifyJwt = AsyncHandler(async (req, res, next) => {
  try {
    const accessToken = await req.cookies?.accessToken;
    if (!accessToken) {
      throw new ApiError(400, "unothorized request");
    }
    const decodedInfo = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decodedInfo) {
      throw new ApiError(400, "invalid token");
    }
    const user = await User.findById(decodedInfo._id).select(
      "-password -accessToken -refreshToken"
    );
    if (!user) {
      throw new ApiError(400, "user not found");
    }
    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, "Token verification failed");
  }
});
