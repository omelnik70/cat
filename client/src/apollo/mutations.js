import { gql } from '@apollo/client';

const UPDATE_MENU_MUTATION = gql`
    mutation UpdateMenu ($id: ID, $name: String!, $link: String!){
        updateMenu(id: $id, name: $name, link: $link) {
            id
            name
            link
        },
    }
`;

const UPDATE_TEXTSITE_MUTATION = gql`
    mutation UpdateTextSite ($id: ID, $titleSite: String!, $descriptionSite: String!, $titleSearch: String!, $titlePopularArticles: String!){
        updateTextSite(id: $id, titleSite: $titleSite, descriptionSite: $descriptionSite, titleSearch: $titleSearch, titlePopularArticles: $titlePopularArticles) {
            id
            titleSite
            descriptionSite
            titleSearch
            titlePopularArticles
        },
    }
`;

const UPDATE_CATEGORY_MUTATION = gql`
    mutation UpdateCategory ($id: ID, $name: String!, $link: String!) {
        updateCategory(id: $id, name: $name, link: $link) {
            id
            name
            link
        },
    }
`;

const UPDATE_PARAGRAPH_MUTATION = gql`
    mutation($id: ID, $text: String!) {
        updateParagraph(id: $id, text: $text) {
            id
            text
        }
    }
`;

const UPDATE_LINK_MUTATION = gql`
    mutation($id: ID, $text: String!, $href: String!) {
        updateLink(id: $id, text: $text, href: $href) {
            id
            text
            href
        }
    }
`;

const UPDATE_IMG_MUTATION = gql`
    mutation($id: ID, $text: String!, $src: String!, $alt: String!) {
        updateImg(id: $id, text: $text, src: $src, alt: $alt) {
            id
            text
            src
            alt
        }
    }
`;

const UPDATE_ARTICLE_MUTATION = gql`
    mutation($id: ID, $title: String!, $rating: Int, $previews: Int, $like: Int, $dislike: Int) {
        updateArticle(id: $id, title: $title, rating: $rating, previews: $previews, like: $like, dislike: $dislike) {
            id
            title
            rating
            previews
            like
            dislike
        }
    }
`;

const ADD_MENU_MUTATION = gql`
    mutation AddMenu ($name: String!, $link: String!, $langId: ID) {
        newMenu: addMenu(name: $name, link: $link, langId: $langId) {
            id
            name
            link
            lang {
              id
            }
        },
    }
`;

const ADD_TEXTSITE_MUTATION = gql`
    mutation AddTextSite ($titleSite: String!, $descriptionSite: String!, $titleSearch: String!, $titlePopularArticles: String!, $langId: ID){
        newTextSite: addTextSite(titleSite: $titleSite, descriptionSite: $descriptionSite, titleSearch: $titleSearch, titlePopularArticles: $titlePopularArticles, langId: $langId) {
            id
            titleSite
            descriptionSite
            titleSearch
            titlePopularArticles
            lang {
              id
            }
        },
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
    mutation($title: String!, $rating: Int, $previews: Int, $like: Int, $dislike: Int, $categoryId: ID) {
        newArticle: addArticle(title: $title, rating: $rating, previews: $previews, like: $like, dislike: $dislike, categoryId: $categoryId) {
            id
            title
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

const ADD_PARAGRAPH_MUTATION = gql`
    mutation($text: String!, $articleId: ID) {
        newParagraph: addParagraph(text: $text, articleId: $articleId) {
            id
            text
            article {
                id
            }
        }
    }
`;

const ADD_LINK_MUTATION = gql`
    mutation($text: String!, $href: String!, $paragraphId: ID) {
        newLink: addLink(text: $text, href: $href, paragraphId: $paragraphId) {
            id
            text
            href
            paragraph {
                id
            }
        }
    }
`;

const ADD_IMG_MUTATION = gql`
    mutation($text: String!, $src: String!, $alt: String!, $paragraphId: ID) {
        newImg: addImg(text: $text, src: $src, alt: $alt, paragraphId: $paragraphId) {
            id
            text
            src
            alt
            paragraph {
                id
            }
        }
    }
`;

const REMOVE_MENU_MUTATION = gql`
    mutation($id: ID) {
        deleteMenu(id: $id) {
            id
        }
    }
`;

const REMOVE_TEXTSITE_MUTATION = gql`
    mutation($id: ID) {
        deleteTextSite(id: $id) {
            id
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

const REMOVE_PARAGRAPH_MUTATION = gql`
    mutation($id: ID) {
        deleteParagraph(id: $id) {
            id
        }
    }
`;

const REMOVE_LINK_MUTATION = gql`
    mutation($id: ID) {
        deleteLink(id: $id) {
            id
        }
    }
`;

const REMOVE_IMG_MUTATION = gql`
    mutation($id: ID) {
        deleteImg(id: $id) {
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
    ADD_IMG_MUTATION,
    ADD_LINK_MUTATION,
    ADD_MENU_MUTATION,
    ADD_ARTICLE_MUTATION,
    ADD_TEXTSITE_MUTATION,
    ADD_CATEGORY_MUTATION,
    ADD_PARAGRAPH_MUTATION,
    UPDATE_IMG_MUTATION,
    UPDATE_MENU_MUTATION,
    UPDATE_ARTICLE_MUTATION,
    UPDATE_TEXTSITE_MUTATION,
    UPDATE_CATEGORY_MUTATION,
    UPDATE_PARAGRAPH_MUTATION,
    UPDATE_LINK_MUTATION,
    REMOVE_MENU_MUTATION,
    REMOVE_ARTICLE_MUTATION,
    REMOVE_TEXTSITE_MUTATION,
    REMOVE_CATEGORY_MUTATION,
    REMOVE_PARAGRAPH_MUTATION,
    REMOVE_LINK_MUTATION,
    REMOVE_IMG_MUTATION,
 };