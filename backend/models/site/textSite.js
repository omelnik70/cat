import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TextSiteSchema = new Schema({
    titleSite: String,
    descriptionSite: String,
    titleSearch: String,
    titlePopularArticles: String,
    likeInfo: String,
    like: String,
    dislike: String,
    langId: String,
});

const TextSite = model("TextSite", TextSiteSchema);

export default TextSite;