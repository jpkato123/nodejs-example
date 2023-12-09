import { print, OutputType } from "../helpers/print.js";

export default class Exception extends Error{
    static WRONG_DB_USERNAME_PASSWORD = "wrong database name or password"
    static WRONG_CONNECTION_STRING = "wrong server name/connection string"
    static WRONG_CONNECTION_DB = "cannot connect to mongoDB"
    static USER_EXIST = "User already exists"
    static CANNOT_REGISTER_USER = " Cannot register user"
    static WRONG_EMAIL_PASSWORD = "'Wrong email or password'"
    constructor(message, validationErrors = {}){
        super(message)//call contructor of parent class(Error)
        print(message, OutputType.ERROR),
        this.validationErrors = validationErrors
    }
}