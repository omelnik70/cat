import graphql, { GraphQLList } from "graphql";

//mongoDB models
import Lang from "../models/lang.js";
import Menu from "../models/site/menu.js";
import Article from "../models/article.js";
import Category from "../models/category.js";
import TextSite from "../models/site/textSite.js";
import Content from "../models/content.js";

//graphql classes
const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
 } = graphql;

 //graphql types
 const LangType = new GraphQLObjectType({
    name: "Lang",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        menu: {
            type: new GraphQLList(MenuType),
            resolve({id}, args) {
                return Menu.find({langId: id});
            },
        },
        category: {
            type: new GraphQLList(CategoryType),
            resolve({id}, args) {
                return Category.find({langId: id});
            },
        },
        textSite: {
            type: new GraphQLList(TextSiteType),
            resolve({id}, args) {
                return TextSite.find({langId: id});
            },
        },
    }),
 });

 const MenuType = new GraphQLObjectType({
    name: "Menu",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
        lang: { 
            type: LangType,
            resolve({langId}, args) {
                return Lang.findById(langId);
            } 
        },
    }),
 });

 const TextSiteType = new GraphQLObjectType({
    name: "TextSite",
    fields: () => ({
        id: { type: GraphQLID },
        titleSite: { type: new GraphQLNonNull(GraphQLString) },
        descriptionSite: { type: new GraphQLNonNull(GraphQLString) },
        titleSearch: { type: new GraphQLNonNull(GraphQLString) },
        titlePopularArticles: { type: new GraphQLNonNull(GraphQLString) },
        likeInfo: { type: GraphQLString },
        like: { type: GraphQLString },
        dislike: { type: GraphQLString },
        lang: { 
            type: LangType,
            resolve({langId}, args) {
                return Lang.findById(langId);
            } 
        },
    }),
 });

 const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        link: { type: new GraphQLNonNull(GraphQLString) },
        lang: { 
            type: LangType,
            resolve({langId}, args) {
                return Lang.findById(langId);
            } 
        },
        article: {
            type: new GraphQLList(ArticleType),
            resolve({id}, args) {
                return Article.find({categoryId: id});
            },
        },
    }),
 });

 const ArticleType = new GraphQLObjectType({
    name: "Article",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        link: { type: GraphQLString },
        rating: { type: GraphQLInt },
        previews: { type: GraphQLInt },
        like: { type: GraphQLInt },
        dislike: { type: GraphQLInt },
        category: { 
            type: CategoryType,
            resolve({categoryId}, args) {
                return Category.findById(categoryId);
            } 
        },
        content: {
            type: new GraphQLList(ContentType),
            resolve({id}, args) {
                return Content.find({articleId: id});
            },
        },
    }),
 });

 const ContentType = new GraphQLObjectType({
    name: "Content",
    fields: () => ({
        id: { type: GraphQLID },
        text_1: { type: GraphQLString },
        text_2: { type: GraphQLString },
        li_1: { type: GraphQLString },
        li_2: { type: GraphQLString },
        strong: { type: GraphQLString },
        imgSrc: { type: GraphQLString },
        imgTitle: { type: GraphQLString },
        aHref: { type: GraphQLString },
        aText: { type: GraphQLString },
        article: { 
            type: ArticleType,
            resolve({articleId}, args) {
                return Article.findById(articleId);
            } 
        },
    }),
 });

 export {
    LangType,
    MenuType,
    TextSiteType,
    CategoryType,
    ArticleType,
    ContentType,
};