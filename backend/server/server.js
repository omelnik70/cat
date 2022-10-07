import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "../graphql/schema.js";
import cors from "cors";

const app = express();
const PORT = 5000;

mongoose.connect("mongodb+srv://admin:cQeond7Cgl@cloud.tqnj3ji.mongodb.net/cloud?retryWrites=true&w=majority",  { useNewUrlParser: true })

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on("error", err => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started');
});