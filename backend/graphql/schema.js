import graphql from "graphql";

import Query from "./query.js";
import Mutation from "./mutation.js";

const { 
    GraphQLSchema,
 } = graphql;

 const schema = new GraphQLSchema({  
    query: Query,
    mutation: Mutation,
 });

 export default schema;