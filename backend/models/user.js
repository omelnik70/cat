import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    uid: String,
    avatar: String,
    login: String,
    email: String,
    password: String,
    pin: Number,
});

const User = model("User", UserSchema);

export default User;