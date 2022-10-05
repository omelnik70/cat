import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CategorySchema = new Schema({
    name: String,
    link: String,
    langId: String,
});

const Category = model("Category", CategorySchema);

export default Category;