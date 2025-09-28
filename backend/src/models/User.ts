// File: backend/src/models/user.ts
// REFACTORED to remove all pre-save hooks and virtual password fields.

import mongoose, { Schema, model, Document, Types, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for the raw attributes of a user.
export interface UserAttributes {
  username: string;
  email: string;
  passwordHash: string; // We only care about the final hash in the database.
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the Mongoose document.
// NOTICE we have REMOVED the virtual 'password' and temporary '_password' fields.
export interface UserDocument extends UserAttributes, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    passwordHash: {
      type: String,
      required: [true, "A password is required to create a user"],
      select: false,
    },
    avatar: {
      type: String,
      default: function (this: UserDocument) {
        return `https://api.dicebear.com/8.x/initials/svg?seed=${this.username}`;
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: Record<string, any>) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// REMOVED: The UserSchema.virtual('password') block is no longer needed.
// REMOVED: The UserSchema.pre('save', ...) hook is no longer needed.

// KEPT: The comparePassword method is still needed for login.
UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// KEPT: The singleton pattern for defining the model.
const User =
  (mongoose.models.User as Model<UserDocument>) ||
  model<UserDocument>("User", UserSchema);

export default User;
