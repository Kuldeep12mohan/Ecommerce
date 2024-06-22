import connectDB from "./db/index.js";
import { server } from "./app.js";
import dotenv from "dotenv"
dotenv.config({
  path:'./.env'
})

connectDB()
.then(()=>
{
  server.listen(process.env.PORT,()=>
  {
    console.log(`app is listening on port ${process.env.PORT}`);
  })
})
.catch((err)=>
{
  console.log("mongo err",err);
});
