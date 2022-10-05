import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ParagraphSchema = new Schema({
    text: String,
    articleId: String,
});

const Paragraph = model("Paragraph", ParagraphSchema);

export default Paragraph;