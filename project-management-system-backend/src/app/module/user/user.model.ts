import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: 0,
    },

    phone: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    bio: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.member,
    },

    department: {
      type: String,
      default: null,
    },

    designation: {
      type: String,
      default: null,
    },

    skills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: USER_STATUS.active,
      index: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    timezone: {
      type: String,
      default: "Asia/Dhaka",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function () {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
});

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
