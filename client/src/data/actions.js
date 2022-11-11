import { 
    CURRENTCAT, 
    CURRENTART, 
    CURRENTLANG, 
    CURRENTSEARCH, 
    CURRENTLISTARTICLES, 
    RESULTSEARCHARTICLES,
} from "./boilerplate";

//создаем action генераторы
const currentCat = (payload) => ({
    type: CURRENTCAT,
    payload,
});

const currentLang = (payload) => ({
    type: CURRENTLANG,
    payload,
});

const currentArt = (payload) => ({
    type: CURRENTART,
    payload,
});

const currentSearch = (payload) => ({
    type: CURRENTSEARCH,
    payload,
});

const currentListArticles = (payload) => ({
    type: CURRENTLISTARTICLES,
    payload,
});

const resultSearchArticles = (payload) => ({
    type: RESULTSEARCHARTICLES,
    payload,
});

export { 
    currentCat,
    currentArt,
    currentLang,
    currentSearch,
    currentListArticles,
    resultSearchArticles,
};