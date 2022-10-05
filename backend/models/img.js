import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ImgSchema = new Schema({
    text: String,
    src: String,
    alt: String,
    paragraphId: String,
});

const Img = model("Img", ImgSchema);

export default Img;