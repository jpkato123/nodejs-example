import { 
    body,
    validationResult 
} from "express-validator"
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import {EventEmitter} from "node:events"
const myEvent = new EventEmitter()
//listen
myEvent.on("event.register.user", (params)=> {
    console.log(`they talled about : ${JSON.stringify(params)}`)
})

import {
    userRespository,
    studentRepository
}from "../respositories/index.js"
import { json } from "express"

const login = async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: errors.array() })
    }


    //debugger
    const { email, password } = req.body
    //call respository
    try {
        let existingUser = await userRespository.login({email, password})
        res.status(HttpStatusCode.OK).json({
        message : " Login Successfully !",
        data : existingUser
        //data : 'detail user here'
    })
    }catch (exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : exception.toString(),
        })
    }
}
const register = async (req, res) =>{
    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body
    myEvent.emit("event.register.user", {email, phoneNumber})
    try{
        const user = await userRespository.register({
            name,
            email,
            password,
            phoneNumber,
            address})
    
        res.status(HttpStatusCode.INSERT_OK).json({
        message : "register successfully !",
        data : user
    })
    }catch(exception){
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message : exception.toString(),
        })
    }
    
}
const getDetailUser = (req, res)=>{
    res.status(HttpStatusCode.OK).json({
        message : "get detail user ok"
    })
}

export default {
    login,
    register,
    getDetailUser
}