import { CURRENTCAT, CURRENTART, CURRENTLANG, CURRENTSEARCH } from "./boilerplate";

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

export { 
    currentCat,
    currentArt,
    currentLang,
    currentSearch
};