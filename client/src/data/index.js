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
    isUser: false,
    uid: '',
    email: '',
    password: '',
    avatar: null,
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
          autocomplete: 'Разрешить сохранение данных',
      },
    },

    //страница для пользователей
    usersPage: {
      ua: {
        title: 'Користувач:',
        logout: 'Вийти',
        change: 'Змінити',
        understand: 'Я розумію',
        password: 'Пароль',
        warningImgTwo: [
          'Розмір Вашого автора перевищує ліміт',
          '2 кБ. Будь ласка, виберіть інший.',
        ],
        warningImgOne: [
          'Рекомендований розмір: 100 x 100 px;',
          `Максимальний об'єм 2 кБ.`,
        ],
        warningEmail: [
          'Щоб змінити email:',
          '1. Вийдіть з облікового запису.',
          '2. Зайдіть знову до облікового запису.',
          '3. Натисніть "Змінити email".',
        ],
        warningPasswordOne: [
          'Щоб змінити пароль:',
          '1. Вийдіть з облікового запису.',
          '2. Зайдіть знову до облікового запису.',
          '3. Натисніть "Змінити пароль".',
        ],
        warningPasswordTwo: [
          'Пароль повинен містити',
          'більше 5 символів!',
        ],
        warningUserDelete: [
          'Щоб видалити обліковий запис:',
          '1. Вийдіть з облікового запису.',
          '2. Зайдіть знову до облікового запису.',
          '3. Натисніть "Видалити обліковий запис".',
        ],
        warningLogin: [
          'Щоб змінити логін:',
          'Змініть email до "@".',
        ],
        warningEmailOne: 'Email введено некоректно!',
        warningEmailTwo: 'Такий email вже є!',
        confirm: 'Підтвердити',
        remove: 'Bидалити',
        reset: 'Скасування',
        passwordName: 'Пароль',
        comments: 'Коментарі',
        commentsText: '-- Ви поки що нічого не коментували --',
        deleteUser: 'Ви дійсно хочете видалити обліковий запис?',
      },
      en: {
        title: 'User:',
        logout: 'Log out',
        change: 'Change',
        understand: 'I understand',
        password: 'Password',
        warningImgTwo: [
          'The size of your avtar exceeds the limit',
          ' of 2 kB. Please choose another.',
        ],
        warningImgOne: [
          'Recommended size: 100 x 100 px;',
          'Maximum size: 2 kB.',
        ],
        warningEmail: [
          'To change email:',
          '1. Sign out.',
          '2. Log in again.',
          '3. Click "Change email".',
        ],
        warningPasswordOne: [
          'To change password:',
          '1. Sign out.',
          '2. Log in again.',
          '3. Click "Change Password".',
        ],
        warningPasswordTwo: [
          'Password must contain',
          'more than 5 characters!',
        ],
        warningUserDelete: [
          'To delete an account:',
          '1. Sign out.',
          '2. Log in again.',
          '3. Click "Delete account".',
        ],
        warningLogin: [
          'To change login:',
          'Change email to "@".',
        ],
        warningEmailOne: 'Email entered incorrectly!',
        warningEmailTwo: 'This email already exists!',
        confirm: 'Confirm',
        remove: 'Delete',
        reset: 'Cancel',
        passwordName: 'Password',
        comments: 'Comments',
        commentsText: `-- You haven't commented yet --`,
        deleteUser: 'Are you sure you want to delete your account?',
      },
      ru: {
        title: 'Пользователь:',
        logout: 'Выйти',
        change: 'Изменить',
        understand: 'Я понимаю',
        password: 'Пароль',
        warningImgTwo: [
          'Размер Вашего автар превышает лимит',
          '2 кБ. Пожалуйста выберите другой.',
        ],
        warningImgOne: [
          'Рекомендуемый размер: 100 x 100 px;',
          'Максимальный объем: 2 киллобайта.',
        ],
        warningEmail: [
          'Чтобы изменить email:',
          '1. Выйдите из аккаунта.',
          '2. Зайдите снова в аккаунт.',
          '3. Нажмите "Изменить email".',
        ],
        warningPasswordOne: [
          'Чтобы изменить пароль:',
          '1. Выйдите из аккаунта.',
          '2. Зайдите снова в аккаунт.',
          '3. Нажмите "Изменить пароль".',
        ],
        warningPasswordTwo: [
          'Пароль должен содержать',
          'более 5 символов!',
        ],
        warningUserDelete: [
          'Чтобы удалить аккаунт:',
          '1. Выйдите из аккаунта.',
          '2. Зайдите снова в аккаунт.',
          '3. Нажмите "Удалить аккаунт".',
        ],
        warningLogin: [
          'Чтобы изменить логин:',
          'Измените email до "@".',
        ],
        warningEmailOne: 'Email введен некорректно!',
        warningEmailTwo: 'Такой email уже есть!',
        confirm: 'Подтвердить',
        remove: 'Удалить',
        reset: 'Отмена',
        passwordName: 'Пароль',
        comments: 'Комментарии',
        commentsText: '-- Вы пока ничего не комментировали --',
        deleteUser: 'Вы действительно хотите удалить аккаунт?',
      },
    },

    //комментарии
    commentsList: {
      ua: {
        loginTitle: 'Логін',
        dateTtitle: 'Дата',
        timeTitle: 'Час',
      },
      en: {
        loginTitle: 'Login:',
        dateTtitle: 'Date:',
        timeTitle: 'Time:',
      },
      ru: {
        loginTitle: 'Логин:',
        dateTtitle: 'Дата:',
        timeTitle: 'Время:',
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
        helpful: 'Чи була інформація корисною?',
        like: 'Корисно',
        dislike: 'Марно',
        more: 'Дивитися ще...',
        confirm: 'Підтвердити',
        cancel: 'Скасувати',
        add: 'Додати',
        info: 'Щоб залишити коментар, потрібно зареєструватися або увійти!',
        register: 'Зареєструватись',
        login: 'Увійти',
      }, 
      en: {
        helpful: 'Was the information helpful?',
        like: 'Like',
        dislike: 'Dislike',
        more: 'See more...',
        confirm: 'Confirm',
        cancel: 'Cancel',
        add: 'Add',
        info: 'To leave a comment, you need to register or login!',
        register: 'Register',
        login: 'Login',
      },
      ru: {
        helpful: 'Была ли информация полезной?',
        like: 'Нравится',
        dislike: 'Не нравится',
        more: 'Смотреть еще...',
        confirm: 'Подтвердить',
        cancel: 'Отменить',
        add: 'Добавить',
        info: 'Чтобы оставить комментарий, нужно зарегистрироваться или войти!',
        register: 'Зарегистрироваться',
        login: 'Войти',
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