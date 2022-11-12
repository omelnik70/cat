import { gql } from '@apollo/client';

const UPDATE_CATEGORY_MUTATION = gql`
    mutation UpdateCategory ($id: ID, $name: String!, $link: String!) {
        updateCategory(id: $id, name: $name, link: $link) {
            id
            name
            link
        },
    }
`;

const UPDATE_CONTENT_MUTATION = gql`
    mutation($id: ID, $text_1: String, $text_2: String, $li_1: String, $li_2: String, $strong: String, $imgSrc: String, $imgTitle: String, $aHref: String, $aText: String) {
        updateContent(id: $id, text_1: $text_1, text_2: $text_2, li_1: $li_1, li_2: $li_2, strong: $strong, imgSrc: $imgSrc, imgTitle: $imgTitle, aHref: $aHref, aText: $aText) {
            id
            text_1
            text_2
            li_1
            li_2
            strong
            imgSrc
            imgTitle
            aHref
            aText
        }
    }
`;

const UPDATE_ARTICLE_MUTATION = gql`
    mutation($id: ID, $title: String, $link: String, $rating: Int, $previews: Int, $like: Int, $dislike: Int) {
        updateArticle(id: $id, title: $title, link: $link, rating: $rating, previews: $previews, like: $like, dislike: $dislike) {
            id
            title
            link
            rating
            previews
            like
            dislike
        }
    }
`;

const ADD_CATEGORY_MUTATION = gql`
    mutation AddCategory ($name: String!, $link: String!, $langId: ID){
        newCategory: addCategory(name: $name, link: $link, langId: $langId) {
            id
            name
            link
            lang {
              id
            }
        },
    }
`;

const ADD_ARTICLE_MUTATION = gql`
    mutation($title: String, $link: String, $rating: Int, $previews: Int, $like: Int, $dislike: Int, $categoryId: ID) {
        newArticle: addArticle(title: $title, link: $link, rating: $rating, previews: $previews, like: $like, dislike: $dislike, categoryId: $categoryId) {
            id
            title
            link
            rating
            previews
            like
            dislike
            category {
              id
            }
        }
    }
`;

const ADD_CONTENT_MUTATION = gql`
    mutation($text_1: String, $text_2: String, $li_1: String, $li_2: String, $strong: String, $imgSrc: String, $imgTitle: String, $aHref: String, $aText: String, $articleId: ID) {
        newContent: addContent(text_1: $text_1, text_2: $text_2, li_1: $li_1, li_2: $li_2, strong: $strong, imgSrc: $imgSrc, imgTitle: $imgTitle, aHref: $aHref, aText: $aText, articleId: $articleId) {
            id
            text_1
            text_2
            li_1
            li_2
            strong
            imgSrc
            imgTitle
            aHref
            aText
            article {
                id
            }
        }
    }
`;

const REMOVE_CATEGORY_MUTATION = gql`
    mutation($id: ID) {
        deleteCategory(id: $id) {
            id
        }
    }
`;

const REMOVE_CONTENT_MUTATION = gql`
    mutation($id: ID) {
        deleteContent(id: $id) {
            id
        }
    }
`;

const REMOVE_ARTICLE_MUTATION = gql`
    mutation($id: ID) {
        deleteArticle(id: $id) {
            id
        }
    }
`;

export { 
    ADD_ARTICLE_MUTATION,
    ADD_CATEGORY_MUTATION,
    ADD_CONTENT_MUTATION,
    UPDATE_ARTICLE_MUTATION,
    UPDATE_CATEGORY_MUTATION,
    UPDATE_CONTENT_MUTATION,
    REMOVE_ARTICLE_MUTATION,
    REMOVE_CATEGORY_MUTATION,
    REMOVE_CONTENT_MUTATION,
 };