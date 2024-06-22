import mongoose,{Schema} from "mongoose";

const productSchema = new Schema(
  {
    name:{
      type:String,
      required:true,
    }
    ,
    description:{
      type:String,
      required:true
    }
    ,
    price:{
      type:Number,
      required:true
    },
    category:{
      type:Schema.Types.ObjectId,
      ref:"Category"
    }
    ,
    imageUrl:{
      type:String,
    }
  },
  {timestamps:true}
)

export const Product = mongoose.model("Product",productSchema)