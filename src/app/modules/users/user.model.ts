/* eslint-disable @typescript-eslint/no-this-alias */
import { Model, Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: 0
    },
    needsPasswordChange: {
      type: Boolean,
      default: true
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student'
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty'
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);
// user.create()/user.save()
userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
