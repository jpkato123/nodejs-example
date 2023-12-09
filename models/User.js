import mongoose, {Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail.js";
export default mongoose.model('User',
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            require: true,
            validator: (value) => value.length > 3,
            message: "username must be at least 3 characters"
        },
        email: {
            type: String,
            validator: (value) => isEmail,
            message: 'Email is incorrect format'
        },
        password: {
            //hashed/encrypted password
            type: String,
            require: true
        },
        phoneNumber: {
            type: String,
            require: true
        },
        address : {
            type: String,
            require: true
        }
    })
)