import { browserLangId } from '../components/Helper/Helper';
import assets from '../assets';

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
        understand: 'Я розумію',
        password: 'Пароль',
        newUsers: {
          title: `AliExpress для нових користувачів`,
          gift: `Подарунки`,
          coupon: `Купони`,
          price: `Ексклюзивна ціна`,
        },
        letyshops: {
          text: 'Зареєструватись',
          link: 'https://letyshops.com/ua/winwin?ww=7718084',
          tagline: 'Кешбек сервіс – поверни своє!',
        },
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
        warningValidComment: 'У коментарі заборонено вказувати посилання!',
        warningEmailOne: 'Email введено некоректно!',
        warningEmailTwo: 'Такий email вже є!',
        confirm: 'Підтвердити',
        cancel: 'Відміна',
        remove: 'Bидалити',
        reset: 'Скасування',
        passwordName: 'Пароль',
        comments: 'Коментарі',
        commentsText: '-- Ви поки що нічого не коментували --',
        deleteUser: 'Ви дійсно хочете видалити обліковий запис?',
        addComment: 'Додати коментар',
        more: 'Дивитися ще...',
        text: `Для перегляду цієї сторінки Ви повинні авторизуватись або зареєструватися!`,
        register: `Зареєструватись`,
        login: `Авторизуватися`,
      },
      en: {
        title: 'User:',
        understand: 'I understand',
        password: 'Password',
        letyshops: {
          text: 'Register',
          link: 'https://letyshops.com/ua/winwin?ww=7718084',
          tagline: 'Cashback service - get yours back!',
        },
        newUsers: {
          title: `AliExpress for new users`,
          gift: `Present`,
          coupon: `Coupons`,
          price: `Exclusive price`,
        },
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
        warningValidComment: 'Links are not allowed in comments!',
        warningEmailOne: 'Email entered incorrectly!',
        warningEmailTwo: 'This email already exists!',
        confirm: 'Confirm',
        cancel: 'Cancel',
        remove: 'Delete',
        reset: 'Cancel',
        passwordName: 'Password',
        comments: 'Comments',
        commentsText: `-- You haven't commented yet --`,
        deleteUser: 'Are you sure you want to delete your account?',
        addComment: 'Add a comment',
        more: 'See more...',
        text: `You must log in or register to view this page!`,
        register: `Register`,
        login: `Log in`,
      },
      ru: {
        title: 'Пользователь:',
        understand: 'Я понимаю',
        password: 'Пароль',
        letyshops: {
          text: 'Зарегистрироваться',
          link: 'https://letyshops.com/ua/winwin?ww=7718084',
          tagline: 'Кешбек сервис - верни свое!',
        },
        newUsers: {
          title: `AliExpress для новых пользователей`,
          gift: `Подарки`,
          coupon: `Купоны`,
          price: `Эксклюзивная цена`,
        },
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
        warningValidComment: 'В комментарии запрещено указывать ссылку!',
        warningEmailOne: 'Email введен некорректно!',
        warningEmailTwo: 'Такой email уже есть!',
        confirm: 'Подтвердить',
        cancel: 'Отмена',
        remove: 'Удалить',
        reset: 'Отмена',
        passwordName: 'Пароль',
        comments: 'Комментарии',
        commentsText: '-- Вы пока ничего не комментировали --',
        deleteUser: 'Вы действительно хотите удалить аккаунт?',
        addComment: 'Добавьте комментарий',
        more: 'Смотреть еще...',
        text: `Для просмотра этой страницы Вы должны авторизоваться или зарегистрироваться!`,
        register: `Зарегистрироваться`,
        login: `Авторизоваться`,
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

    //страницы подвала
    policy: {
      ua: {
        title: 'Політика конфіденційності сайту alihelper.top',
        contents: [
          {
            subtitle: '',
            pOne: `Адміністрація сайту www.alihelper.com зобов'язується зберігати вашу конфіденційність в Інтернеті. Ми приділяємо велике значення охороні наданих вами даних. Наша політика конфіденційності ґрунтується на вимогах`,
            a: {
              link: 'https://ec.europa.eu/info/law/law-topic/data-protection_en', 
              text: ' Загального регламенту захисту персональних даних Європейського Союзу (GDPR). '
            },
            pTwo: `Цілі, в яких ми збираємо персональні дані: покращення роботи нашого сервісу, здійснення контактів з відвідувачами даного сайту, здійснення послуг, пов'язаних із напрямком діяльності даного сайту, а також для наведених нижче дій.`,
          },
          {
            subtitle: 'Збір та використання персональних даних.',
            pOne: 'Ми збираємо та використовуємо ваші персональні дані лише у випадку вашої добровільної згоди. За згодою, ви дозволяєте нам збирати та використовувати такі дані: електронна пошта. Збір та обробка ваших даних проводиться відповідно до законів, що діють на території Європейського Союзу та в державі України.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Зберігання даних, зміна та видалення.',
            pOne: `Користувач, який надав свої персональні дані сайту alihelper.com, має право на їх зміну та видалення, а також на відкликання своєї згоди з їх використанням. Термін, протягом якого зберігатимуться ваші персональні дані: час, необхідний для використання даних для основної діяльності сайту. При завершенні використання даних адміністрація сайту видаляє їх. Для доступу до ваших персональних даних ви можете зв'язатися з адміністрацією сайту за наступною адресою: admin@alihelper.com. Ми можемо передавати ваші особисті дані третій стороні тільки з вашої добровільної згоди, якщо вони були передані, то зміни даних в інших організаціях, не пов'язаних з нами, ми не можемо здійснити.`,
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Використання технічних даних під час відвідування сайту.',
            pOne: 'При відвідуванні вами сайту alihelper.com у базі даних зберігаються записи про вашу IP адресу, час відвідування, налаштування браузера, операційну систему, а також інша технічна інформація, необхідна для коректного відображення вмісту сайту. За цими даними нам неможливо ідентифікувати особу відвідувача.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Надання інформації дітьми.',
            pOne: `Якщо ви є батьком або опікуном, і ви знаєте, що ваші діти надали нам свої особисті дані без вашої згоди, зв'яжіться з нами: admin@alihelper.com. На нашому сервісі заборонено залишати особисті дані неповнолітніх без згоди батьків чи опікунів.`,
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Використання cookies.',
            pOne: `Для коректного відображення вмісту та зручності використання сайту alihelper.com ми використовуємо cookie файли. Це невеликі файли, які зберігаються на вашому пристрої. Вони допомагають сайту запам'ятати інформацію про вас, наприклад, якою мовою ви переглядаєте сайт і які сторінки ви вже відкривали, ця інформація буде корисна при наступному відвідуванні. Завдяки файлам cookie перегляд сайту стає значно зручнішим. Докладніше про ці файли ви можете`,
            a: {
              link: 'https://ru.wikipedia.org/wiki/Cookie', 
              text: ' прочитати тут. '
            },
            pTwo: 'Ви можете налаштувати прийом або блокування cookie у браузері самостійно. Неможливість приймати cookie може обмежити працездатність сайту.',
          },
          {
            subtitle: 'Використання персональних даних іншими сервісами.',
            pOne: 'На цьому сайті використовуються сторонні інтернет-сервіси, які здійснюють незалежний від нас збір інформації: Google Analytics, Google AdSense. Зібрані ними дані можуть надаватися іншим службам усередині цих організацій, вони можуть використовувати дані для персоналізації реклами своєї рекламної мережі. Ви можете прочитати угоди цих організацій на їхніх сайтах. Там же ви можете відмовитися від збору ними персональних даних, наприклад, блокувальник',
            a: {
              link: 'https://tools.google.com/dlpage/gaoptout', 
              text: ' Google Analytics є тут. '
            },
            pTwo: 'Ми не передаємо персональні дані іншим організаціям та службам, не зазначеним у цій політиці конфіденційності. Виняток становить лише передача інформації за законних вимог державних органів, уповноважених здійснювати дані дії.',
          },
          {
            subtitle: 'Посилання на інші сайти',
            pOne: 'Наш сайт alihelper.com може містити посилання на інші сайти, які не керуються нами. Ми не відповідаємо за їх зміст. Ми рекомендуємо ознайомитися з політикою конфіденційності кожного сайту, який ви відвідуєте, якщо вона там є.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Зміни у політиці конфіденційності.',
            pOne: `Наш сайт alihelper.com може оновлювати нашу політику конфіденційності час від часу. Ми повідомляємо про будь-які зміни, розмістивши нову політику конфіденційності на цій сторінці. Ми відстежуємо зміни законодавства щодо персональних даних у Європейському Союзі та в державі Україна. Якщо ви залишили персональні дані у нас, то ми повідомимо вас про зміну політики конфіденційності. Якщо ваші персональні дані були введені не коректно, ми не зможемо з вами зв'язатися.`,
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: `Зворотній зв'язок, останні положення.`,
            pOne: `Зв'язатися з адміністрацією сайту alihelper.com з питань, пов'язаних із політикою конфіденційності, можна за адресою: admin@alihelper.com. Якщо ви не погоджуєтесь з даною політикою конфіденційності, ви не можете користуватися послугами сайту alihelper.com, у цьому випадку ви повинні утриматися від відвідування нашого сайту.`,
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
        ],
      },
      en: {
        title: 'Alihelper.top Website Privacy Policy',
        contents: [
          {
            subtitle: '',
            pOne: 'The site administration alihelper.com undertakes to maintain your privacy on the Internet. We attach great importance to the protection of the data you provide. Our privacy policy is based on requirements',
            a: {
              link: 'https://ec.europa.eu/info/law/law-topic/data-protection_en', 
              text: ' European Union General Data Protection Regulation (GDPR). '
            },
            pTwo: 'The purposes for which we collect personal data are: improving the operation of our service, establishing contacts with visitors to this site, providing services related to the activity of this site, as well as for the following actions.',
          },
          {
            subtitle: 'Collection and use of personal data.',
            pOne: 'We collect and use your personal data only with your voluntary consent. By agreeing to this, you authorize us to collect and use the following data: email. The collection and processing of your data is carried out in accordance with the laws in force in the territory of the European Union and in the state of Ukraine.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Data storage, modification and deletion.',
            pOne: 'The user who has provided his personal data to the alihelper.com website has the right to change and delete them, as well as to withdraw his consent to their use. The period for which your personal data will be stored: the time necessary for the data to be used for the main activities of the site. At the end of the use of your data, the site administration deletes them. To access your personal data, you can contact the site administration at the following address: admin@alihelper.com. We can transfer your personal data to a third party only with your voluntary consent, if they were transferred, then we cannot change the data in other organizations that are not related to us.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Use of technical data when visiting the site.',
            pOne: `When you visit the alihelper.com website, the database stores records about your IP address, time of visit, browser settings, operating system, as well as other technical information necessary for the correct display of the site's content. Based on this data, it is impossible for us to identify the identity of the visitor.`,
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Providing information to children.',
            pOne: 'If you are a parent or guardian and you are aware that your children have provided us with their personal information without your consent, please contact us: admin@alihelper.com. On our service it is forbidden to leave personal data of minors without the consent of parents or guardians.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Use of cookies.',
            pOne: 'For the correct display of the content and for the convenience of using the alihelper.com website, we use cookies. These are small files that are stored on your device. They help the site remember information about you, such as what language you are viewing the site in and what pages you have already opened, this information will be useful the next time you visit. Thanks to cookies, browsing the site becomes much more convenient. You can learn more about these files',
            a: {
              link: 'https://ru.wikipedia.org/wiki/Cookie', 
              text: ' read here. '
            },
            pTwo: 'You can configure your browser to accept or block cookies on your own. Failure to accept cookies may limit the functionality of the site.',
          },
          {
            subtitle: 'Use of personal data by other services.',
            pOne: 'This website uses third-party Internet services that collect information independent of us: Google Analytics, Google AdSense. The data they collect may be shared with other services within these organizations, and they may use the data to personalize ads from their own ad network. You can read the user agreements of these organizations on their websites. In the same place, you can refuse the collection of personal data by them, for example, a blocker',
            a: {
              link: 'https://tools.google.com/dlpage/gaoptout', 
              text: ' Google Analytics is here. '
            },
            pTwo: 'We do not share personal data with other organizations and services not listed in this privacy policy. The only exception is the transfer of information under the legal requirements of state bodies authorized to carry out these actions.',
          },
          {
            subtitle: 'Links to other sites.',
            pOne: 'Our website alihelper.com may contain links to other websites that are not operated by us. We are not responsible for their content. We encourage you to read the privacy policy of each site you visit, if available.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Changes to the privacy policy.',
            pOne: 'Our website alihelper.com may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. We monitor changes in legislation relating to personal data in the European Union and in the state of Ukraine. If you have left personal data with us, we will notify you of a change in the privacy policy. If your personal data was entered incorrectly, we will not be able to contact you.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Feedback, final provisions.',
            pOne: 'You can contact the administration of the alihelper.com website for questions related to the privacy policy at: admin@alihelper.com. If you do not agree with this privacy policy, you may not use the services of the alihelper.com website, in which case you should refrain from visiting our website.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
        ],
      },
      ru: {
        title: 'Политика Конфиденциальности сайта alihelper.top',
        contents: [
          {
            subtitle: '',
            pOne: 'Администрация сайта alihelper.com обязуется сохранять вашу конфиденциальность в Интернете. Мы уделяем большое значение охране предоставленных вами данных. Наша политика конфиденциальности основана на требованиях',
            a: {
              link: 'https://ec.europa.eu/info/law/law-topic/data-protection_en', 
              text: ' Общего регламента о защите персональных данных Европейского Союза (GDPR). '
            },
            pTwo: 'Цели, в которых мы собираем персональные данные: улучшение работы нашего сервиса, осуществление контактов с посетителями данного сайта, осуществление услуг, связанных с направлением деятельности данного сайта, а так же для указанных ниже действий.',
          },
          {
            subtitle: 'Сбор и использование персональных данных.',
            pOne: 'Мы собираем и используем ваши персональные данные только в случае вашего добровольного согласия. При согласии с этим, вы разрешаете нам собирать и использовать следующие данные: электронная почта. Сбор и обработка ваших данных проводится соответствии с законами, действующими на территории Европейского Союза и в государстве Украина.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Хранение данных, изменение и удаление.',
            pOne: 'Пользователь, предоставивший свои персональные данные сайту alihelper.com имеет право на их изменение и удаление, а так же на отзыв своего согласия с их использованием. Срок, в течение которого будут храниться ваши персональные данные: время, необходимое для использования данных для основной деятельности сайта. При завершении использования ваших данных администрация сайта удаляет их. Для доступа к своим персональным данным вы можете связаться с администрацией сайта по следующему адресу: admin@alihelper.com. Мы можем передавать ваши личные данные третьей стороне только с вашего добровольного согласия, если они были переданы, то изменение данных в других организациях, не связанных с нами, мы осуществить не можем.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Использование технических данных при посещении сайта.',
            pOne: 'При посещении вами сайта alihelper.com в базе данных сохраняются записи о вашем IP адресе, времени посещения, настройках браузера, операционной системе, а также другая техническая информация, необходимая для корректного отображения содержимого сайта. По этим данным нам невозможно идентифицировать личность посетителя.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Предоставление информации детьми.',
            pOne: 'Если Вы являетесь родителем или опекуном, и вы знаете, что ваши дети предоставили нам свои личные данные без Вашего согласия, свяжитесь с нами: admin@alihelper.com. На нашем сервисе запрещено оставлять личные данные несовершеннолетних без согласия родителей или опекунов.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Использование cookies.',
            pOne: 'Для корректного отображения содержимого и для удобства использования сайта alihelper.com мы используем cookie файлы. Это небольшие файлы, которые хранятся на вашем устройстве. Они помогают сайту запомнить информацию о вас, например на каком языке вы просматриваете сайт и какие страницы вы уже открывали, эта информация будет полезна при следующем посещении. Благодаря файлам cookie просмотр сайта становится значительно более удобным. Подробнее про эти файлы вы можете',
            a: {
              link: 'https://ru.wikipedia.org/wiki/Cookie', 
              text: ' прочитать здесь. '
            },
            pTwo: 'Вы можете настроить прием или блокировку cookie в браузере самостоятельно. Невозможность принимать cookie может ограничить работоспособность сайта.',
          },
          {
            subtitle: 'Использование персональных данных другими сервисами.',
            pOne: 'На этом сайте используются сторонние интернет-сервисы, осуществляющие независимый от нас сбор информации: Google Analytics, Google AdSense. Собранные ими данные могут предоставляться другим службам внутри этих организаций, они могут использовать данные для персонализации рекламы своей собственной рекламной сети.  Вы можете прочитать пользовательские соглашения этих организаций на их сайтах. Там же вы можете отказаться от сбора ими персональных данных, к примеру блокировщик',
            a: {
              link: 'https://tools.google.com/dlpage/gaoptout', 
              text: ' Google Analytics находится здесь. '
            },
            pTwo: 'Мы не передаем персональные данные другим организациям и службам, не указанным в данной политике конфиденциальности. Исключение составляет только передача информации при законных требованиях государственных органов, уполномоченных осуществлять данные действия.',
          },
          {
            subtitle: 'Ссылки на другие сайты.',
            pOne: 'Наш сайт alihelper.com может содержать ссылки на другие сайты, которые не управляются нами. Мы не несем ответственность за их содержание. Мы рекомендуем вам ознакомиться с политикой конфиденциальности каждого сайта, который вы посещаете, если она там есть.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Изменения в политике конфиденциальности.',
            pOne: 'Наш сайт alihelper.com может обновлять нашу политику конфиденциальности время от времени. Мы сообщаем о любых изменениях, разместив новую политику конфиденциальности на этой странице. Мы отслеживаем изменения законодательства, касающегося персональных данных в Европейском Союзе и в государстве Украина. Если вы оставили персональные данные у нас, то мы оповестим вас об изменении в политике конфиденциальности. Если ваши персональные данные были введены не корректно, то мы не сможем с вами связаться.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
          {
            subtitle: 'Обратная связь, заключительные положения.',
            pOne: 'Связаться с администрацией сайта alihelper.com по вопросам, связанным с политикой конфиденциальности можно по адресу: admin@alihelper.com. Если вы не согласны с данной политикой конфиденциальности, вы не можете пользоваться услугами сайта alihelper.com, в этом случае вы должны воздержаться от посещения нашего сайта.',
            a: {
              link: '', 
              text: ''
            },
            pTwo: '',
          },
        ],
      },
    },

    //страницы подвала
    about: {
      ua: {
        title: 'Про проект',
        contacts: 'Для всіх, хто зацікавлений у співпраці зі мною, мої контакти:',
        bye: 'Дякую всім, хто користується сайтом, усім миру та добра!',
        contents: [
          {
            subtitle: '',
            p: 'Алі Помічник - це каталог статей з корисною інформацією про взаємодію покупців з популярним світовим торговим майданчиком AliExpress. Мільйони людей роблять покупки на ній щодня і багато хто з них не знає як вирішити проблеми, що виникають при цьому. Ті, хто опинявся в подібних ситуаціях, знають, що найчастіше знайти корисну інформацію в розділі сервіс покупців AliExpress не так просто.',
          },
          {
            subtitle: '',
            p: 'На сайті Алі Помічник вся інформація доступна у трьох мовних версіях: російська, українська та англійська. Автоматично, при завантаженні сайту, Ви побачите версію сайту тією мовою, яка встановлена у Вашому браузері, як основна (російська — російська версія, українська — українська версія, будь-яка інша — англійська версія). Якщо ви бажаєте змінити мовну версію сайту, то в шапці сайту перемкніть прапорець.',
          },
          {
            subtitle: '',
            p: 'Пошук за статтями відбувається так швидко, що Ви навіть не помітите, набираючи запит, що результат вже перед Вами. На сайті зібрано близько 200 актуальних статей на тему. Але, якщо з якоїсь причини, Ви не знайшли відповідь на своє запитання, залиште коментар під будь-яку статтю, можливо, хтось з інших відвідувачів сайту підкаже Вам варіант вирішення Вашої проблеми. Для фільтрації спаму залишити коментар можна буде після простої реєстрації. Розміщення посилань у коментарях заборонено!',
          },
          {
            subtitle: '',
            p: `Усі зареєстровані користувачі отримають персональну сторінку на сайті, де можна буде переглядати своїми коментарями та оцінками з боку інших користувачів. Ви можете редагувати або видаляти свої коментарі. Також доступно: додати аватар або фото (розмір 100*100 px, об'єм до 2kB), змінити email, логін, пароль, вийти з облікового запису або видалити його. Згадайте, що, якщо Ви оновили свій акаунт, не видаливши попередньо свої коментарі, то вони залишаться на сайті, а Ви втратите до нього доступ. Якщо Ви прийшли / зареєструвалися на сайті, то Вам не доведеться знову заходити в свій обліковий запис через час, сайт автоматично Вас дізнається.`,
          },
          {
            subtitle: '',
            p: 'Якщо Ваш коментар зрушився сильно вниз свіжішими коментарями, а Вам важливо отримати відгук на нього, не потрібно знову писати такий же, просто оновіть дату цього коментаря, натиснувши на відповідну іконку у своєму акаунті.',
          },
          {
            subtitle: 'Про автора.',
            p: 'Автор ідеї сайту та її реалізації – Омельник Сергій, програміст з України. Я працюю з JavaScript React - бібліотекою для створення інтерфейсів користувача. Цей сайт створено за цією технологією. Як хостинг, сервер і база даних використовуються сервіси Firebase.',
          },
        ],
      },
      en: {
        title: 'About the project',
        contacts: 'For everyone who is interested in cooperation with me, my contacts:',
        bye: 'Thanks to everyone who uses the site, peace and goodness to all!',
        contents: [
          {
            subtitle: '',
            p: 'Ali Assistant is a directory of articles with useful information about the interaction of buyers with the popular global marketplace AliExpress. Millions of people make purchases on it every day and many of them do not know how to solve the problems that arise. Those who have been in similar situations know that it is often not so easy to find useful information in the AliExpress Buyer Service section.',
          },
          {
            subtitle: '',
            p: 'On the Ali Helper website, all information is available in three language versions: Russian, Ukrainian and English. Automatically, when loading the site, you will see the version of the site in the language that is installed in your browser as the main one (Russian - the Russian version, Ukrainian - the Ukrainian version, any other - the English version). If you want to change the language version of the site, then switch the checkbox in the site header.',
          },
          {
            subtitle: '',
            p: 'The search for articles is so fast that you will not even notice, typing the search query, that the result is already in front of you. About 200 relevant articles on a given topic are collected on the site. But, if for some reason you did not find the answer to your question, leave a comment under any of the articles, perhaps someone from other visitors to the site will tell you a solution to your problem. To filter spam, you can leave a comment after simple registration. Placing links in comments is prohibited!',
          },
          {
            subtitle: '',
            p: 'All registered users will have a personal page on the site, where you can follow your comments and ratings from other users. You can edit or delete your comments. Also available: add an avatar or photo (size 100*100 px, size up to 2kB), change email, login, password, log out of the account or delete the ego. Remember that if you delete your account without first deleting your comments, they will remain on the site, and you will lose access to them. If you have entered / registered on the site, you will not have to log in again after a while, the site will automatically recognize you.',
          },
          {
            subtitle: '',
            p: 'If your comment has moved down a lot with more recent comments, and it is important for you to get a response to it, you do not need to write the same one again, just update the date of this comment by clicking on the appropriate icon in your account.',
          },
          {
            subtitle: 'About the author.',
            p: `The author of the idea of the site and its implementation is Sergey Omelnik, a programmer from Ukraine. I'm working with JavaScript React - a library for creating user interfaces. This site was created using this technology. Firebase services are used as hosting, server and database.`,
          },
        ],
      },
      ru: {
        title: 'О проекте',
        contacts: 'Для всех, кто заинтересован в сотрудничестве со мной, мои контакты:',
        bye: 'Спасибо всем, кто пользуется сайтом, всем мира и добра!',
        contents: [
          {
            subtitle: '',
            p: 'Али Помощник — это каталог статей с полезной информацией о взаимодействии покупателей с популярной мировой торговой площадкой AliExpress. Миллионы людей совершают покупки на ней ежедневно и многие из них не знают как решить возникающие при этом проблемы. Те, кто оказывался в подобных ситуациях, знают, что зачастую найти полезную информацию в разделе сервис покупателей AliExpress не так уж и просто.',
          },
          {
            subtitle: '',
            p: 'На сайте Али Помощник вся информация доступна в трех языковых версиях: русская, украинская и английская. Автоматически, при загрузке сайта, Вы увидите версию сайта на том языке, который установлен в Вашем браузере, как основной (русский — русская версия, украинский — украинская версия, любой другой — английская версия). Если Вы хотите изменить языковую версию сайта, то в шапке сайта переключите флажок.',
          },
          {
            subtitle: '',
            p: 'Поиск по статьям происходит так быстро, что Вы даже не заметите, набирая поисковый запрос, что результат уже перед Вами. На сайте собрано порядка 200 актуальных статей на заданную тему. Но, если по какой-то причине, Вы не нашли ответ на свой вопрос, оставьте комментарий под любой из статей, возможно, кто-то из других посетителей сайта подскажет Вам вариант решения Вашей проблемы. Для фильтрации спама, оставить комментарий можно будет после простой регистрации. Размещение ссылок в комментариях запрещено!',
          },
          {
            subtitle: '',
            p: 'Все зарегистрированные пользователи будут иметь персональную страничку на сайте, где можно следить за своими комментариями и оценками к ним со стороны других пользователей. Вы можете свои комментарии редактировать или удалять.  Также доступно: добавить аватар или фото (размер 100*100 px, объем до 2кБ), изменить email, логин, пароль, выйти из аккаунта или удалить его. Помните, что, если Вы удалите свой аккаунт, не удалив предварительно свои комментарии, то они останутся на сайте, а Вы потеряете к ним доступ. Если Вы вошли / зарегистрировались на сайте, то Вам не придется снова входить в свой аккаунт через время, сайт автоматически Вас опознает.',
          },
          {
            subtitle: '',
            p: 'Если Ваш комментарий сдвинулся сильно вниз более свежими комментариями, а для Вас важно получить отклик на него, не нужно снова писать такой же, просто обновите дату этого комментария, нажав на соотвествующую иконку в своем аккаунте.',
          },
          {
            subtitle: 'Об авторе.',
            p: 'Автор идеи сайта и ее реализации — Омельник Сергей, программист из Украины. Я работаю с JavaScript React - библиотекой для создания пользовательских интерфейсов. Этот сайт создан по этой технологии. В качестве хостинга, сервера и базы данных используются сервисы Firebase.',
          },
        ],
        socialNetworks: [
          {
            link: 'https://github.com/omelnik70',
            img: assets.ICONS.GITHUB
          },
          {
            link: 'https://www.linkedin.com/in/serhii-omelnik-25717b250/',
            img: assets.ICONS.LINKEDIN
          },
          {
            link: 'https://t.me/SerhiiOmelnik',
            img: assets.ICONS.TELEGRAM
          },
          {
            link: 'https://www.facebook.com/sergejomelnik/',
            img: assets.ICONS.FACEBOOK
          },
        ]
      },
    },

    //шапка сайта
    header: {
      ua: {
        logo: 'Алі Помічник',
        description: 'Не знаєте як купувати на АліЕкспрес - запитайте у АліПомічника',
        donat_1: `Підтримати проект можна за `,
        donat_2: `посиланням`,
        donat_3: ` або QR-кодом.`,
        menu: [
          {
            text: 'Магазин',
            link: 'https://s.click.aliexpress.com/e/_DeH5G1B',
          },
          {
            text: 'Каталог',
            link: 'https://s.click.aliexpress.com/e/_Dlvpdlx',
          },
          {
            text: 'Рейтинги',
            link: 'https://s.click.aliexpress.com/e/_DeBknFB',
          },
          {
            text: 'Купони',
            link: 'https://s.click.aliexpress.com/e/_DcQuUFT',
          },
          {
            text: 'Знижки',
            link: 'https://s.click.aliexpress.com/e/_Dermn6H',
          },
        ],
      },
      en: {
        logo: 'Ali Helper',
        description: `Don't know how to buy on Aliexpress - ask Ali Assistant`,
        donat_1: `You can support the project by `,
        donat_2: `link`,
        donat_3: ` or QR code.`,
        menu: [
          {
            text: 'Shop',
            link: 'https://s.click.aliexpress.com/e/_DeH5G1B',
          },
          {
            text: 'Catalog',
            link: 'https://s.click.aliexpress.com/e/_Dlvpdlx',
          },
          {
            text: 'Ratings',
            link: 'https://s.click.aliexpress.com/e/_DeBknFB',
          },
          {
            text: 'Coupons',
            link: 'https://s.click.aliexpress.com/e/_DcQuUFT',
          },
          {
            text: 'Discounts',
            link: 'https://s.click.aliexpress.com/e/_Dermn6H',
          },
        ],
      },
      ru: {
        logo: 'Али Помощник',
        description: 'Не знаете как покупать на АлиЭкспресс - спросите у АлиПомощника',
        donat_1: `Поддержать проект можно по `,
        donat_2: `ссылке`,
        donat_3: ` или QR коду.`,
        menu: [
          {
            text: 'Магазин',
            link: 'https://s.click.aliexpress.com/e/_DeH5G1B',
          },
          {
            text: 'Каталог',
            link: 'https://s.click.aliexpress.com/e/_Dlvpdlx',
          },
          {
            text: 'Рейтинги',
            link: 'https://s.click.aliexpress.com/e/_DeBknFB',
          },
          {
            text: 'Купоны',
            link: 'https://s.click.aliexpress.com/e/_DcQuUFT',
          },
          {
            text: 'Скидки',
            link: 'https://s.click.aliexpress.com/e/_Dermn6H',
          },
        ],
      },
    },

    //подвал сайта
    footer: {
      ua: {
        menu: [
          {
            text: 'Про проект',
            link: '/about',
          },
          {
            text: 'Політика конфіденційності',
            link: '/privacy_policy',
          },
        ],
      },
      en: {
        menu: [
          {
            text: 'About the project',
            link: '/about',
          },
          {
            text: 'Privacy Policy',
            link: '/privacy_policy',
          },
        ],
      },
      ru: {
        menu: [
          {
            text: 'О проекте',
            link: '/about',
          },
          {
            text: 'Политика конфидициальности',
            link: '/privacy_policy',
          },
        ],
      },
    },
    aboutAli: {
      ru: {
        title: `Коротко об AliExpress`,
        text: [
          `AliExpress — это глобальная торговая площадка, на которой можно приобрести товары, производимые в КНР, Европе, Турции и других странах, имеющих возможность торговать на AliExpress. Продажа товаров ведется в розницу и мелким оптом.`,
          `AliExpress в настоящее время доступен на девяти языках - русском, английском, испанском, нидерландском, французском, итальянском, польском, арабском и португальском (перевод машинный, поэтому ингода не точный). Для клиентов, чей язык не представлен в этом списке, автоматически предоставляется английская версия.`,
          `Сайт входит в перечень сорока самых посещаемых веб-ресурсов в мире по версии Alexa.`,
          `AliExpress стал доступен для покупок в 2010 году, как интернет магазин китайских товаров в другие страны.`,
          `Владельцем интернет магазина AliExpress является Alibaba Group, она же владеет такими популярными китайскими ресурсами, как Alibaba.com, Taobao.com и другие.`,
          `С ноября 2018 года на AliExpress появились товары из Турции с площадки Trendyol, которую приобрела Alibaba Group.`,
          `В 2019 году Alibaba Group открыла крупный магазин в торговом центре Барселоны.`
        ],
      },
      ua: {
        title: `Коротко про AliExpress`,
        text: [
          `AliExpress — це глобальний торговий майданчик, на якому можна придбати товари, які виробляються в КНР, Європі, Туреччині та інших країнах, які мають можливість торгувати на AliExpress. Продаж товарів ведеться в роздріб та дрібним оптом.`,
          `AliExpress в даний час доступний дев'ятьма мовами - російською, англійською, іспанською, нідерландською, французькою, італійською, польською, арабською та португальською (переклад машинний, тому інгода не точний). Для клієнтів, чия мова не представлена у цьому списку, автоматично надається англійська версія.`,
          `Сайт входить до переліку сорока найбільш відвідуваних веб-ресурсів у світі за версією Alexa.`,
          `AliExpress став доступним для покупок у 2010 році, як інтернет магазин китайських товарів в інші країни.`,
          `Власником інтернет магазину AliExpress є Alibaba Group, вона володіє такими популярними китайськими ресурсами, як Alibaba.com, Taobao.com та інші.`,
          `З листопада 2018 року на AliExpress з'явилися товари з Туреччини з майданчика Trendyol, яку придбала Alibaba Group.`,
          `У 2019 році Alibaba Group відкрила великий магазин у торговому центрі Барселони.`
        ],
      },
      en: {
        title: `Briefly about AliExpress`,
        text: [
          `AliExpress is a global marketplace where you can buy goods made in China, Europe, Turkey and other countries that can trade on AliExpress. Sale of goods is carried out at retail and small wholesale.`,
          `AliExpress is currently available in nine languages - Russian, English, Spanish, Dutch, French, Italian, Polish, Arabic and Portuguese (machine translation, so sometimes not accurate). For customers whose language is not included in this list, the English version is automatically provided.`,
          `The site is included in the list of the forty most visited web resources in the world according to Alexa.`,
          `AliExpress became available for purchases in 2010 as an online store of Chinese goods to other countries.`,
          `The AliExpress online store is owned by Alibaba Group, which also owns such popular Chinese resources as Alibaba.com, Taobao.com and others.`,
          `Since November 2018, goods from Turkey have appeared on AliExpress from the Trendyol site, which was acquired by Alibaba Group.`,
          `In 2019, Alibaba Group opened a large store in a Barcelona mall.`
        ],
      },
    },
    slider: [
      {
        slide: assets.ADDS.FRESHFINDS, 
        link: 'https://s.click.aliexpress.com/e/_DcZQNFP',
      },
      {
        slide: assets.ADDS.WEEKLYDEALS, 
        link: 'https://s.click.aliexpress.com/e/_DcHTSdB',
      },
      {
        slide: assets.ADDS.GREATVALUEDEALS, 
        link: 'https://s.click.aliexpress.com/e/_Dn2lgdn',
      },
      {
        slide: assets.ADDS.SUPERBRANDS, 
        link: 'https://s.click.aliexpress.com/e/_DmHlVxr',
      },
    ],
  };

export default DATA;