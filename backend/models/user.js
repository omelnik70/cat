import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    uid: String,
    avatar: String,
    avatarDeleteLink: String,
    login: String,
    email: String,
    password: String,
});

const User = model("User", UserSchema);

export default User;