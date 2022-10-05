import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LinkSchema = new Schema({
    text: String,
    href: String,
    paragraphId: String,
});

const Link = model("Link", LinkSchema);

export default Link;