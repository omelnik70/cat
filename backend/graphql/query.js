import graphql, { GraphQLList } from "graphql";

//mongoDB models
import Lang from "../models/lang.js";
import Menu from "../models/site/menu.js";
import Article from "../models/article.js";
import Category from "../models/category.js";
import TextSite from "../models/site/textSite.js";
import Content from "../models/content.js";

import { 
    LangType,
    MenuType,
    TextSiteType,
    CategoryType,
    ArticleType, 
    ContentType,
} from "./types.js";

//graphql classes
const { 
    GraphQLObjectType,
    GraphQLID,
 } = graphql;

 //queries
 const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        //Lang
        lang: {
            type: LangType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Lang.findById(id);
            },

        },

        langs: {
            type: new GraphQLList(LangType),
            resolve(parent, args) {
                return Lang.find({});
            },

        },

        //TextSite
        textSite: {
            type: TextSiteType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return TextSite.findById(id);
            },

        },

        textsites: {
            type: new GraphQLList(TextSiteType),
            resolve(parent, args) {
                return TextSite.find({});
            },

        },

        //Menu
        menu: {
            type: MenuType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Menu.findById(id);
            },

        },

        menus: {
            type: new GraphQLList(MenuType),
            resolve(parent, args) {
                return Menu.find({});
            },

        },

        //Category
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Category.findById(id);
            },

        },

        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find({});
            },

        },

        //Article
        article: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Article.findById(id);
            },

        },

        articles: {
            type: new GraphQLList(ArticleType),
            resolve(parent, args) {
                return Article.find({});
            },

        },

        //Content
        content: {
            type: ContentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Content.findById(id);
            },

        },

        contents: {
            type: new GraphQLList(ContentType),
            resolve(parent, args) {
                return Content.find({});
            },

        },
    },

 });

 export default Query;