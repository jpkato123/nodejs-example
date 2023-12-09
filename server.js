/* import { sum } from "./calculator.js";
var name = "Hieu";
console.log(name);
console.log(`4+5 = ${sum(4,5)}`); */
import express from 'express';
import connect from './database/database.js';
import * as dotenv from "dotenv";
//authentication middleware
import checkToken from './authentication/auth.js';
import {
  usersRouter,
  studentsRouter
} from "./routers/index.js"

dotenv.config()// must have
const app = express()
app.use(checkToken)// shield, guard
app.use(express.json()) //co the doc duo the body
const port = process.env.PORT ?? 3000


//routers
app.use("/users",usersRouter)
app.use("/students", studentsRouter)
app.get("/",(req, res)=>{
  res.send("response to client haaa")
})
app.listen(port, async () => {
  await connect()
  console.log('Example app listening on port 3000!')
});