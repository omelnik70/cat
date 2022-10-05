import assets from '../assets';
import { browserLangId } from '../components/Helper/Helper';

const DATA = {
    //категории статей
    category: {
      cat: "",
    },

    //язык сайта
    lang: browserLangId,

    //размер экрана для мобильных настроек
    global: {
      SCREENWIDTH: 767,
    },

    //социальные сети
    socialUrl: [
      {url: 'https://www.facebook.com/groups/ali.ukraine', img: assets.ICONS.FACEBOOK,},
      {url: 'https://www.instagram.com/ali.in.ua/', img: assets.ICONS.INSTAGRAM,},
      {url: 'https://twitter.com/UaAliexpress', img: assets.ICONS.TWITTER,},
      {url: 'https://www.youtube.com/channel/UCwvoDgJjnDOYcKvZ2DQJ_aQ', img: assets.ICONS.YOUTUBE,},
      {url: 'https://www.tiktok.com/@ali.in.ua', img: assets.ICONS.TIKTOK,},
      {url: 'https://www.reddit.com/user/SWSCompany', img: assets.ICONS.REDDIT,},
    ],
  };

export default DATA;