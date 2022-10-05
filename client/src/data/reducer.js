import { CURRENTCAT, CURRENTLANG } from "./boilerplate";

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

        //по умолчанию 
        default: 
        return { ...state }; //возвращаем старый объект сосотояния
        //throw new Error(); возвращаем ошибку
    }
};

export default reducer;
