import graphql from "graphql";

//mongoDB models
import Lang from "../models/lang.js";
import Menu from "../models/site/menu.js";
import Article from "../models/article.js";
import Category from "../models/category.js";
import TextSite from "../models/site/textSite.js";

//graphql types
import { 
    LangType,
    MenuType,
    TextSiteType,
    CategoryType,
    ArticleType, 
} from "./types.js";

//graphql classes
const { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
 } = graphql;

 //mutations
 const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

        //menu
        addMenu: {
            type: MenuType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                link: { type: new GraphQLNonNull(GraphQLString) },
                langId: { type: GraphQLID },
            },
            resolve(parent, { name, link, langId }) {
                const menu = new Menu({
                    name,
                    link,
                    langId,
                });
                return menu.save();
            },
        },

        deleteMenu: {
            type: MenuType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Menu.findByIdAndRemove(id);
            },
        },

        updateMenu: {
            type: MenuType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                link: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, name, link }) {
                return Menu.findByIdAndUpdate(
                    id, 
                    { $set: { name, link } },
                    { new: true },
                );
            },
        },

        //textSite
        addTextSite: {
            type: TextSiteType,
            args: {
                titleSite: { type: new GraphQLNonNull(GraphQLString) },
                descriptionSite: { type: new GraphQLNonNull(GraphQLString) },
                titleSearch: { type: new GraphQLNonNull(GraphQLString) },
                titlePopularArticles: { type: new GraphQLNonNull(GraphQLString) },
                langId: { type: GraphQLID },
            },
            resolve(parent, { titleSite, descriptionSite, titleSearch, titlePopularArticles, langId }) {
                const textSite = new TextSite({
                    titleSite,
                    descriptionSite,
                    titleSearch,
                    titlePopularArticles,
                    langId,
                });
                return textSite.save();
            },
        },

        deleteTextSite: {
            type: TextSiteType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return TextSite.findByIdAndRemove(id);
            },
        },

        updateTextSite: {
            type: TextSiteType,
            args: {
                id: { type: GraphQLID },
                titleSite: { type: new GraphQLNonNull(GraphQLString) },
                descriptionSite: { type: new GraphQLNonNull(GraphQLString) },
                titleSearch: { type: new GraphQLNonNull(GraphQLString) },
                titlePopularArticles: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, titleSite, descriptionSite, titleSearch, titlePopularArticles }) {
                return TextSite.findByIdAndUpdate(
                    id, 
                    { $set: { titleSite, descriptionSite, titleSearch, titlePopularArticles } },
                    { new: true },
                );
            },
        },

        //category
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                link: { type: new GraphQLNonNull(GraphQLString) },
                langId: { type: GraphQLID },
            },
            resolve(parent, { name, link, langId }) {
                const category = new Category({
                    name,
                    link,
                    langId,
                });
                return category.save();
            },
        },

        deleteCategory: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Category.findByIdAndRemove(id);
            },
        },

        updateCategory: {
            type: CategoryType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                link: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, name, link }) {
                return Category.findByIdAndUpdate(
                    id, 
                    { $set: { name, link } },
                    { new: true },
                );
            },
        },

        //article
        addArticle: {
            type: ArticleType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                rating: { type: GraphQLInt },
                previews: { type: GraphQLInt },
                like: { type: GraphQLInt },
                dislike: { type: GraphQLInt },
                categoryId: { type: GraphQLID },
            },
            resolve(parent, { title, rating, previews, like, dislike, categoryId }) {
                const article = new Article({
                    title,
                    rating,
                    previews,
                    like,
                    dislike,
                    categoryId,
                });
                return article.save();
            },
        },

        deleteArticle: {
            type: ArticleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Article.findByIdAndRemove(id);
            },
        },

        updateArticle: {
            type: ArticleType,
            args: {
                id: { type: GraphQLID },
                title: { type: new GraphQLNonNull(GraphQLString) },
                rating: { type: GraphQLInt },
                previews: { type: GraphQLInt },
                like: { type: GraphQLInt },
                dislike: { type: GraphQLInt },
            },
            resolve(parent, { id, title, rating, previews, like, dislike }) {
                return Article.findByIdAndUpdate(
                    id, 
                    { $set: { title, rating, previews, like, dislike } },
                    { new: true },
                );
            },
        },

        //lang
        addLang: {
            type: LangType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { name, country }) {
                const lang = new Lang({
                    name,
                    country,
                });
                return lang.save();
            },
        },

        deleteLang: {
            type: LangType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Lang.findByIdAndRemove(id);
            },
        },

        updateLang: {
            type: LangType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                country: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, country, name }) {
                return Lang.findByIdAndUpdate(
                    id, 
                    { $set: { country, name } },
                    { new: true },
                );
            },
        },
    },
});

 export default Mutation;