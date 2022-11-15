import { gql } from '@apollo/client';

const CATEGORIES_QUERY = gql`
    query {
        categories {
            id
            name
            link
            lang {
                id
            }
            article {
                id
                title
                link
                rating
                previews
                like
                dislike
                content {
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
                category {
                    link
                }
            }
        }
    }
`;

const ARTICLES_QUERY = gql`
    query {
        articles {
            id
            title
            link
            rating
            previews
            like
            dislike
            category {
                id
                lang {
                    id
                }
            }
        }
    }
`;

const CONTENTS_QUERY = gql`
    query {
        contents {
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

const ARTICLE_QUERY = gql`
    query($id: ID) {
        article(id: $id) {
            id
            title
            link
            rating
            previews
            like
            dislike
            content {
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
    }
`;

const USER_QUERY = gql`
    query($id: ID) {
        user(id: $id) {
            id
            uid
    		avatar
            login
            email
            password
            pin
        }
    }
`;

const USERS_QUERY = gql`
    query {
        users {
            id
            uid
            avatar
            login
            email
            password
            pin
        }
    }
`;

const LANGS_QUERY = gql`
    query {
        langs {
            id
            name
            country
            category {
              id
              name
            }
        }
    }
`;

export { 
    LANGS_QUERY,
    ARTICLES_QUERY,
    ARTICLE_QUERY,
    CATEGORIES_QUERY,
    CONTENTS_QUERY,
    USER_QUERY,
    USERS_QUERY,
};