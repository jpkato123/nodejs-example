import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import student from "../controllers/student.js";

const Student = mongoose.model('Student',
    new Schema({
        id: {type:ObjectId},
        name: {
            type: String,
            require: true,
            //model validation
            validate: {
                validator: (name) => name.length > 3,
                message: 'name must be at least 3 characters'
            }
        },
        email: {
            type: String,
            validate: {
                validator: isEmail,
                message: 'Email is incorrect format'
            }
        },
        languages: {
            type: [String]// this is an array
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female'],
                message: '{VALUE} is not supported'
            },
            require: true
        },
        phoneNumber: {
            type: String,
            require: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 5 && phoneNumber.length <= 20,
                message: 'Phone number must be at least 5 charactors, max : 20'
            }
        },
        address: {
            type: String,
            require: false
        },
    })
)
export default Student