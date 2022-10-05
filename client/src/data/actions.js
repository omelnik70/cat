import { CURRENTCAT, CURRENTLANG } from "./boilerplate";

//создаем action генераторы
const currentCat = (payload) => ({
    type: CURRENTCAT,
    payload,
});

const currentLang = (payload) => ({
    type: CURRENTLANG,
    payload,
});

export { 
    currentCat,
    currentLang
};