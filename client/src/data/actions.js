import { 
    CURRENTCAT, 
    CURRENTART, 
    CURRENTLANG, 
    CURRENTSEARCH, 
    CURRENTLISTARTICLES, 
    RESULTSEARCHARTICLES,
    EMAILINPUT,
    PASSWORDINPUT,
    HANDLEAUTHCLICK,
    USERVALIDSTATUS
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

const emailInput = (payload) => ({
    type: EMAILINPUT,
    payload,
});

const passwordInput = (payload) => ({
    type: PASSWORDINPUT,
    payload,
});

const handleAuthClick = (payload) => ({
    type: HANDLEAUTHCLICK,
    payload,
});

const userValidStatus = (payload) => ({
    type: USERVALIDSTATUS,
    payload,
});

export { 
    currentCat,
    currentArt,
    currentLang,
    currentSearch,
    currentListArticles,
    resultSearchArticles,
    emailInput,
    passwordInput,
    handleAuthClick,
    userValidStatus
};