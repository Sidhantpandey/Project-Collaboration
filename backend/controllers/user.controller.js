import userModel from "../models/user.models.js"
import * as userService from '../services/user.service.js'
import {validationResult} from 'express-validator'


// This controller will first validate the things coming
export const createUserController=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:error.array() });
    }
    try {
        const user=await userService.createUser(req.body);

        const token=await user.generateJWT();
        
        res.status(201).json({user,token})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginController=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.satatus(400).json({errors:errors.array()});
    }
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email}).select('+password');

        if(!user){
            res.status(401).json({errors:"Invalid Credentials"})
        }

        const isMatch=await user.isValidPassword(password)

        if(!isMatch){
            res.status(401).json({errors:"Invalid Credentials"})

        }

        const token=await user.generateJWT();
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}