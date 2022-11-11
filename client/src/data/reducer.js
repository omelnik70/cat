import { 
    CURRENTCAT, 
    CURRENTART, 
    CURRENTLANG, 
    CURRENTSEARCH, 
    CURRENTLISTARTICLES, 
    RESULTSEARCHARTICLES, 
} from "./boilerplate";

//создаем кейсы по изменению состояния
const reducer = (state, action) => {
    switch (action.type) {
        //кейс изменяет состояние
        case CURRENTCAT: 
        return {
            //производим действие по изменению старого состояния
            ...state,
            cat: action.payload,
        };

        case CURRENTLANG: 
        return {
            ...state,
            lang: action.payload,
        };

        case CURRENTART: 
        return {
            ...state,
            art: action.payload,
        };

        case CURRENTSEARCH: 
        return {
            ...state,
            search: action.payload,
        };

        case CURRENTLISTARTICLES: 
        return {
            ...state,
            currentListArt: action.payload,
        };

        case RESULTSEARCHARTICLES: 
        return {
            ...state,
            resultSearchArt: action.payload,
        };

        //по умолчанию 
        default: 
        return { ...state }; //возвращаем старый объект сосотояния
        //throw new Error(); возвращаем ошибку
    }
};

export default reducer;
