import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MenuSchema = new Schema({
    name: String,
    link: String,
    langId: String,
});

const Menu = model("Menu", MenuSchema);

export default Menu;