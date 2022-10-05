import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ArticleSchema = new Schema({
    title: String,
    rating: Number,
    previews: Number,
    like: Number,
    dislike: Number,
    categoryId: String,
});

const Article = model("Article", ArticleSchema);

export default Article;