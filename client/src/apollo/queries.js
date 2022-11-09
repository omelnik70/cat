import { gql } from '@apollo/client';

const MENU_QUERY = gql`
    query($id: ID) {
        lang(id: $id) {
            id
            menu{
                id
                name
                link
            }
        }
    }
`;

const MENUS_QUERY = gql`
    query {
        menus {
            id
            name
            link
            lang {
                id
            }
        }
    }
`;

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

const TEXTSITES_QUERY = gql`
    query {
    textsites {
        id
        titleSite
        descriptionSite
        titleSearch
        titlePopularArticles
        likeInfo
        like
        dislike
        lang {
            id
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
    MENU_QUERY,
    LANGS_QUERY,
    MENUS_QUERY,
    ARTICLES_QUERY,
    ARTICLE_QUERY,
    CATEGORIES_QUERY,
    CONTENTS_QUERY,
    TEXTSITES_QUERY,
};