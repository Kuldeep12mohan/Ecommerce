import mongoose from "mongoose";

const connectDB = async ()=>
  {
    try{
     const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/notification`)
     console.log(`\n  mongodb connected !! DB host:${connectionInstance.connection.host}`);
    }
    catch(err)
    {
      console.log("MONGODB CONNECTION ERROR",err);
      process.exit(1);
    }

  }

  export default connectDB;