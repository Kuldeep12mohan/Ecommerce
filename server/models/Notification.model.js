import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema(
  {
    sender:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    notification:{
      type:String,
      default:"a user sends a notification"
    }
  },
  {timestamps:true}
)

export const Notification = mongoose.model("Notification",notificationSchema);