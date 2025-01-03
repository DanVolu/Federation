import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  username: string;
  email: string;
  weight_category: string;
  birthdate: string;
  password: string;
  roles: string[];
}

const userSchema: Schema<UserInterface> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    weight_category: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ["user"], // Every user starts with the "user" role
    },
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model<UserInterface>("User", userSchema);

export default User;