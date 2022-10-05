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
    CATEGORIES_QUERY,
    TEXTSITES_QUERY
};