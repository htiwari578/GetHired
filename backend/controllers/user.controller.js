import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


// user register
export const register =  async (req, res)=>{
    try{
        const {fullname , email ,phoneNumber,  password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role ) {
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
       
        // check user is alreday exist 

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User is already exist with this email',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create ({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilrPhoto:cloudResponse.secure_url,
            }
        });
        return res.status(201).json({
            message:"Account created successfully",
            success: true
        });

        } catch (error){

    }
}
// user login
export const login = async (req, res ) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role ) {
            return res.status(400).json({
                message:"Something is missing",
                success: false
            });
        }
    //  checking login user exist in database

    let user = await User.findOne({email});
    if(!user || !user.password){
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false
        })
    }

    // checking password is matched or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(!isPasswordMatch) {
        return res.status(400).json({
            message: "Incorrect email or password",
            success: true
        })
    }
        
        if(role !== user.role){
        return res.status(400).json({
            message:"account doesn't exit with current role",
            success:false
        })
    };
    
    const tokenData ={
        userId:user._id
    }
    const token =await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '8d' });

    const userData = {
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        phoneNumber: user.phoneNumber,
        role:user.role,
        profile:user.profile

    };
    return res.status(200).cookie("token", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly:true, sameSite:'strict' }).json({
    message:`Welcome back ${user.fullname}`,
    user: userData,
    success: true
    })

    } catch (error){
        console.log(error);

    }
}
//  user logout
export const logout = async (req,res) =>{
    try{

        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        });
    } catch (error){
        console.log(error);
    }

}
// update the user profile
export const updateProfile = async (req, res)=>{

    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        // console.log(file);
        // use cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


       

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
       
        const userId = req.id; 
        let user = await User.findById(userId);

        if(!user){

            return res.status(400).json({
                message:"User not found",
                success: false
            })
        }

        // updating user data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber=phoneNumber
        if(bio) user.profile.bio =bio
        if(skills)  user.profile.skills =skillsArray


        // resume upload
        if(cloudResponse){
            
            // saving the cloudinary url
            // user.profile.profilePhoto = cloudResponse.secure_url; 
            user.profile.resume = cloudResponse.secure_url
            // saved the original name of resume
            user.profile.resumeOriginalName = file.originalname 
        }
      


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).json({
            message:"Profile updated succesfuly",
            user,
            success:true

        })
       
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false
        });
    }
}