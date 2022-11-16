import graphql from "graphql";

//mongoDB models
import Lang from "../models/lang.js";
import User from "../models/user.js";
import Article from "../models/article.js";
import Category from "../models/category.js";
import Content from "../models/content.js";

//graphql types
import { 
    LangType,
    UserType,
    CategoryType,
    ArticleType, 
    ContentType,
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
                title: { type: GraphQLString },
                link: { type: GraphQLString },
                rating: { type: GraphQLInt },
                previews: { type: GraphQLInt },
                like: { type: GraphQLInt },
                dislike: { type: GraphQLInt },
                categoryId: { type: GraphQLID },
            },
            resolve(parent, { title, link, rating, previews, like, dislike, categoryId }) {
                const article = new Article({
                    title,
                    link,
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
                title: { type: GraphQLString },
                link: { type: GraphQLString },
                rating: { type: GraphQLInt },
                previews: { type: GraphQLInt },
                like: { type: GraphQLInt },
                dislike: { type: GraphQLInt },
            },
            resolve(parent, { id, title, link, rating, previews, like, dislike }) {
                return Article.findByIdAndUpdate(
                    id, 
                    { $set: { title, link, rating, previews, like, dislike } },
                    { new: true },
                );
            },
        },

        //content
        addContent: {
            type: ContentType,
            args: {
                text_1: { type: GraphQLString },
                text_2: { type: GraphQLString },
                li_1: { type: GraphQLString },
                li_2: { type: GraphQLString },
                strong: { type: GraphQLString },
                imgSrc: { type: GraphQLString },
                imgTitle: { type: GraphQLString },
                aHref: { type: GraphQLString },
                aText: { type: GraphQLString },
                articleId: { type: GraphQLID },
            },
            resolve(parent, { text_1, text_2, li_1, li_2, strong, imgSrc, imgTitle, aHref, aText, articleId }) {
                const content = new Content({
                    text_1,
                    text_2,
                    li_1,
                    li_2,
                    strong,
                    imgSrc,
                    imgTitle,
                    aHref,
                    aText,
                    articleId,
                });
                return content.save();
            },
        },

        deleteContent: {
            type: ContentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return Content.findByIdAndRemove(id);
            },
        },

        updateContent: {
            type: ContentType,
            args: {
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
            },
            resolve(parent, { id, text_1, text_2, li_1, li_2, strong, imgSrc, imgTitle, aHref, aText }) {
                return Content.findByIdAndUpdate(
                    id, 
                    { $set: { text_1, text_2, li_1, li_2, strong, imgSrc, imgTitle, aHref, aText } },
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

        //User
        addUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                uid: { type: new GraphQLNonNull(GraphQLString) },
                avatar: { type: GraphQLString },
                avatarDeleteLink: { type: GraphQLString },
                login: { type: GraphQLString },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, { id, uid, avatar, avatarDeleteLink, login, email, password }) {
                const user = new User({
                    id, 
                    uid,
                    avatar,
                    avatarDeleteLink, 
                    login, 
                    email, 
                    password,
                });
                return user.save();
            },
        },

        deleteUser: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, {id}) {
                return User.findByIdAndRemove(id);
            },
        },

        updateUser: {
            type: UserType,
            args: {
                id: { type: GraphQLID },
                avatar: { type: GraphQLString },
                login: { type: GraphQLString },
                avatarDeleteLink: { type: GraphQLString },
            },
            resolve(parent, { id, avatar, avatarDeleteLink, login }) {
                return User.findByIdAndUpdate(
                    id, 
                    { $set: { avatar, avatarDeleteLink, login } },
                    { new: true },
                );
            },
        },
    },
});

 export default Mutation;