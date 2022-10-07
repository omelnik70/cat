import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ContentSchema = new Schema({
    text_1: String,
    text_2: String,
    li_1: String,
    li_2: String,
    strong: String,
    imgSrc: String,
    imgTitle: String,
    aHref: String,
    aText: String,
    articleId: String,
});

const Content = model("Content", ContentSchema);

export default Content;