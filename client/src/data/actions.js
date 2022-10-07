import { CURRENTCAT, CURRENTART, CURRENTLANG } from "./boilerplate";

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

export { 
    currentCat,
    currentArt,
    currentLang
};