import mongoose, { Schema } from "mongoose";

const AdminAuthSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email:{
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AdminAuth = mongoose.model(
  "AdminAuth",
  AdminAuthSchema
);
