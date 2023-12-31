import { Schema, model, models, Model, Document } from "mongoose"

interface UserModel extends Document {
  username: string
  userid: number
  time: Date
  blocked: Boolean
  subscribed: Boolean
}

const UserSchema = new Schema<UserModel>({
  username: {
    type: String,
  },
  userid: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
})

export default (models.User as Model<UserModel>) || model("User", UserSchema)
