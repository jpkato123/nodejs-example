import { print, OutputType } from "../helpers/print.js"
import User from "../models/User.js"
import Exception from "../exceptions/Exception.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const login = async ({ email, password }) => {
    //print("Login user in user repositories", OutputType.INFORMATION)
    let existingUser = await User.findOne({email}).exec()
    if(existingUser){
        let isMatch = await bcrypt.compare(password, existingUser.password)
        if(!!isMatch){
            //create jave web tocken
            let token = jwt.sign({
                data : existingUser
            },
            process.env.JWT_SECRET, {
                // expiresIn: '60', //1 minute
                expiresIn: '30 days'
            }
            )
            //clone an add more property
            return {
                ...existingUser.toObject(),
                password: 'not show',
                token: token
            }
        }else {
            throw new Exception(Exception.WRONG_EMAIL_PASSWORD)
        }
    }else {
        throw new Exception(Exception.WRONG_EMAIL_PASSWORD)
    }
}
const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address }) => {
    // validation akready done
    const existingUser = await User.findOne({ email }).exec()
    if (!!existingUser) {
        throw new Exception(Exception.USER_EXIST)
    }
    // encrypt password with bcrypt library
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    //insert to db
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address
    })
    return {
        ...newUser._doc,
        password: 'not show'
    }
    /* print("Login user in user repositories with name :"+name+"email : "
    +email+"password : "+password+"phoneNumber : "+phoneNumber+"address : "+address, OutputType.INFORMATION) */
}
export default {
    login,
    register
}