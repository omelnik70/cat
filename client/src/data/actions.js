import { CURRENTCAT, CURRENTART, CURRENTLANG, CURRENTSEARCH, CURRENTLISTARTICLES } from "./boilerplate";

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

export { 
    currentCat,
    currentArt,
    currentLang,
    currentSearch,
    currentListArticles
};