import { browserLangId } from '../components/Helper/Helper';

const DATA = {
    //категории статей
    cat: "",

    //текущая статья
    art: "",

    //язык сайта
    lang: browserLangId,

    //язык сайта
    search: '',

    //текущий список статей при пагинации
    currentListArt: [],

    //текущий список статей при поиске
    resultSearchArt: [],

    //размер экрана для мобильных настроек
    global: {
      SCREENWIDTH: 767,
    },
  };

export default DATA;