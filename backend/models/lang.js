import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LangSchema = new Schema({
    name: String,
    country: String,
});

const Lang = model("Lang", LangSchema);

export default Lang;