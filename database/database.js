import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";
async function connect(){
    try{
        let conncetion = await mongoose.connect(process.env.MONGO_URI)
        print("connect mongoose successfully !", OutputType.SUCCESS)
        //console.log("connect mongoose successfully !")
        //return connection
    }catch (error){
        //let errormessage = error.code
        const {code} = error
        if (error.code == 8000){
            //print("connect mongoose error !", OutputType.ERROR)
            
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        }else if(code == "ENOTFOUND"){
            throw new Exception(Exception.WRONG_CONNECTION_STRING)
        }
        throw new Exception(Exception.WRONG_CONNECTION_DB)

    }
}
export default connect
