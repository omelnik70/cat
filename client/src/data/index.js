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

    //регистрация / вход
    uid: '',
    email: '',
    password: '',
    avatar: '',
    fnAuth: () => {},

    //текущий список статей при пагинации
    currentListArt: [],

    //текущий список статей при поиске
    resultSearchArt: [],

    //статус пользователя
    userValid: "/login",

    //размер экрана для мобильных настроек
    global: {
      SCREENWIDTH: 767,
    },

    //форма входа / регистрации
    registr: {
      ua: {
          registration: 'Реєстрація',
          register: 'Зареєструватися',
          clearForm: 'Очистити форму',
          alreadyRegistered: 'Ви вже зареєстровані? ',
          alreadyLogin: 'Ви ще не зареєстровані? ',
          signIn: 'Зайти',
          password: 'Пароль',
          login: 'Вхід',
          textEmailInvalid: 'Такий Email не зареєстрований у системі!',
          textPasswordInvalid: 'Невірний пароль!',
          textRegistered: 'Дякую за реєстрацію. Тепер Ви можете залишати коментарі до статей!',
          textUserValid: 'Вітаю! Ви успішно залогінились.',
          passwordText: 'Пароль повинен містити більше 5 символів!',
          emailText: 'Email введено некоректно!',
          userText: 'Користувач із таким Email вже існує!',
          userCheckPin: 'Не вірний пін!',
          pinTextMessage: 'Пінкод має містити 4 цифри!',
          pinInputText: 'Придумайте пін 4 цифри',
          autocomplete: 'Дозволити збереження даних',
      },
      en: {
          registration: 'Registration',
          register: 'Register',
          clearForm: 'Clear the form',
          alreadyRegistered: 'Are you already registered? ',
          alreadyLogin: 'You are not registered yet? ',
          signIn: 'Sign in',
          password: 'Password',
          login: 'Login',
          textEmailInvalid: 'This Email is not registered in the system!',
          textPasswordInvalid: 'Invalid password!',
          textRegistered: 'Thanks for signing up. Now you can leave comments on articles!',
          textUserValid: 'Congratulations! You have successfully logged in.',
          passwordText: 'The password must contain more than 5 characters!',
          emailText: 'The email was entered incorrectly!',
          userText: 'User with this Email already exists!',
          userCheckPin: 'Invalid pin!',
          pinTextMessage: 'Pincode must contain 4 digits!',
          pinInputText: 'Come up with a 4 digit pin',
          autocomplete: 'Enable data saving',
      },
      ru: {
          registration: 'Регистрация',
          register: 'Зарегистрироваться',
          clearForm: 'Очистить форму',
          alreadyRegistered: 'Вы уже зарегистрированы? ',
          alreadyLogin: 'Вы еще не зарегистрированы? ',
          signIn: 'Войти',
          password: 'Пароль',
          login: 'Вход',
          textEmailInvalid: 'Такой Email не зарегистрирован в системе!',
          textPasswordInvalid: 'Не верный пароль!',
          textRegistered: 'Спасибо за регистацию. Теперь Вы можете оставлять комментарии к статьям!',
          textUserValid: 'Поздравляем! Вы успешно залогинились.',
          passwordText: 'Пароль должен содержать более 5 символов!',
          emailText: 'Email введен некорректно!',
          userText: 'Пользователь с таким Email уже существует!',
          userCheckPin: 'Не верный пин!',
          pinTextMessage: 'Пинкод должен содержать 4 цифры!',
          pinInputText: 'Придумайте пин 4 цифры',
          autocomplete: 'Разрешить сохранение данных',
      },
    },

    //поиск и результаты поиска
    searchTexts: {
      ua: {
        result: 'Результати пошуку',
        found: 'Нічого не знайдено, спробуйте змінити запит.',
        title: 'задайте своє питання',
        textInput: 'Почніть вводити Ваш запит'
      },
      en: {
        result: 'Searching results',
        found: 'Nothing found, try changing your query.',
        title: 'ask your question',
        textInput: 'Start typing your request'
      },
      ru: {
        result: 'Результаты поиска',
        found: 'Ничего не найдено, попробуйте изменить запрос.',
        title: 'задайте свой вопрос',
        textInput: 'Начните вводить Ваш запрос'
      },
    },

    //тексты для статьи
    postText: {
      ua: {
        message: 'Вашу думку враховано, дякую за участь в опитуванні!',
        helpful: 'Чи була інформація корисною?',
        like: 'Корисно',
        dislike: 'Марно',
      }, 
      en: {
        message: 'Your opinion is taken into account, thanks for participating in the survey!',
        helpful: 'Was the information helpful?',
        like: 'Like',
        dislike: 'Dislike',
      },
      ru: {
        message: 'Ваше мнение учтено, спасибо за участие в опросе!',
        helpful: 'Была ли информация полезной?',
        like: 'Нравится',
        dislike: 'Не нравится',
      },
    },

    //Заголовок на главной
    popularArticles: {
      ua: 'Популярні статті',
      en: 'Popular articles',
      ru: 'Популярные статьи',
    },

    //шапка сайта
    header: {
      ua: {
        logo: 'Алі Помічник',
        description: 'Не знаєте як купувати на АліЕкспрес - запитайте у АліПомічника',
        menu: [
          {
            text: 'Крамниця',
            link: 'https://s.zbanx.com/r/DAujDHRTt8P9',
          },
          {
            text: 'Каталог',
            link: 'https://s.zbanx.com/r/TGQVIPUQCBbs',
          },
          {
            text: 'Супер пропозиції',
            link: 'https://s.zbanx.com/r/Zb8gipmyEYx2',
          },
          {
            text: 'Новим покупцям',
            link: 'https://s.zbanx.com/r/4Y971JOIRIlN',
          },
          {
            text: 'Топ бренди',
            link: 'https://s.zbanx.com/r/chxbcRcuYP3g',
          },
          {
            text: 'Бестселери',
            link: 'https://s.zbanx.com/r/DjzfyY8cd9rK',
          },
          {
            text: 'Центр купонів',
            link: 'https://s.zbanx.com/r/u1nPpwW6iaaB',
          },
        ],
      },
      en: {
        logo: 'Ali Helper',
        description: `Don't know how to buy on Aliexpress - ask Ali Assistant`,
        menu: [
          {
            text: 'Shop',
            link: 'https://s.zbanx.com/r/DAujDHRTt8P9',
          },
          {
            text: 'Catalogue',
            link: 'https://s.zbanx.com/r/TGQVIPUQCBbs',
          },
          {
            text: 'Super deals',
            link: 'https://s.zbanx.com/r/Zb8gipmyEYx2',
          },
          {
            text: 'New buyers',
            link: 'https://s.zbanx.com/r/4Y971JOIRIlN',
          },
          {
            text: 'Top brands',
            link: 'https://s.zbanx.com/r/chxbcRcuYP3g',
          },
          {
            text: 'Bestsellers',
            link: 'https://s.zbanx.com/r/DjzfyY8cd9rK',
          },
          {
            text: 'Coupon center',
            link: 'https://s.zbanx.com/r/u1nPpwW6iaaB',
          },
        ],

      },
      ru: {
        logo: 'Али Помощник',
        description: 'Не знаете как покупать на АлиЭкспресс - спросите у АлиПомощника',
        menu: [
          {
            text: 'Магазин',
            link: 'https://s.zbanx.com/r/DAujDHRTt8P9',
          },
          {
            text: 'Каталог',
            link: 'https://s.zbanx.com/r/TGQVIPUQCBbs',
          },
          {
            text: 'Супер предложения',
            link: 'https://s.zbanx.com/r/Zb8gipmyEYx2',
          },
          {
            text: 'Новым покупателям',
            link: 'https://s.zbanx.com/r/4Y971JOIRIlN',
          },
          {
            text: 'Топ бренды',
            link: 'https://s.zbanx.com/r/chxbcRcuYP3g',
          },
          {
            text: 'Бестселлеры',
            link: 'https://s.zbanx.com/r/DjzfyY8cd9rK',
          },
          {
            text: 'Центр купонов',
            link: 'https://s.zbanx.com/r/u1nPpwW6iaaB',
          },
        ],
      },
    },
  };

export default DATA;