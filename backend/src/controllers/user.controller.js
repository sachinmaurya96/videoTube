import { User } from "../models/user.model.js";
import { ApiError, ApiResponse, AsyncHandler } from "../utils/index.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken =await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong when generating tokens");
  }
};
const signup = AsyncHandler(async (req, res, next) => {
    const {name,email,password,username} = req.body
    if(!(name && email && password && username)){
        throw new ApiError(400,"all fields are required")
    }
    const existUser = await User.findOne({$or:[{email},{username}]})
    if(existUser){
        throw new ApiError(400,"user with this email of username is already exist")
    }
    const user = await User.create({
        name,
        email,
        password,
        username
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"something went wrong while creating user")
    }
    return res
    .status(201)
    .json(new ApiResponse(201,"user created successfully",createdUser))
});
const login = AsyncHandler(async(req,res,next)=>{
    const {username,email,password} = req.body
    if(!(username && email && password)){
        throw new ApiError(400,"all fields is required")
    }
    const user = await User.findOne({$or:[{email},{username}]})
    if(!user){
        throw new ApiError(400,"user with this email or username does not exist")
    }
    const isPasswordValid  = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400,"invalid user credentials")
    }
    const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,option)
    .cookie("refreshToken",refreshToken,option)
    .json(new ApiResponse(200,"user loggedin successfully",{loggedInUser,accessToken,refreshToken}))
})
export {
    signup,
    login
}