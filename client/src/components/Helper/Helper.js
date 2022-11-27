//определяет язык браузера
export function browserLocale (lang) {
  
    navigator.languages && navigator.languages.length ?
      // latest versions of Chrome and Firefox set this correctly
    lang = navigator.languages[0] :
    navigator.userLanguage ?
      // IE only
    lang = navigator.userLanguage :
      // latest versions of Chrome, Firefox, and Safari set this correctly
    lang = navigator.language;
  
    return lang
  };

  //присваиваем языку браузера id языка из mongoDB
  export const browserLangId = (function() {
  const lang = browserLocale();
  if(lang === "ru") {
    return "6311a25b4690f0b08bf74077";
  } else if(lang === "ua") {
    return "6311a2434690f0b08bf74075";
  } else {
    return "6311a20e4690f0b08bf74073";
  }
}());

//транслитерация ссылки из киррилицы
export const transliter = ( str ) => {
   
  const cyrillic = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
      'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
      'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
      'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya', ' ': '_',
      'і': 'i', 'ї': 'i', '1': '1', '2': '2', '3': '3','4': '4',
      '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
      'й': 'i'
  },
 
  n_str = [],
  length = str.length;
  str = str.replace(/[ъь]+.,%?()"'/g, '').replace(/[-]/g, 'and').toLowerCase();
 
  for ( let i = 0; i < length; ++i ) {
     n_str.push(cyrillic[ str[i] ]);
  }
 
  return n_str.join('');
};

export const createLink = ( str ) => {
  return str.toLowerCase().replace(/[ /]/g,"_").replace(/[\s.,%?()"']/g, '').replace(/[-]/g, 'and');
};

//высчитывает рейтинг по количеству like/dislike
export const wilsonScore = (up, down) => {
	if (!up) return down;
	const n = up + down;
	const z = 1.64485; //1.0 = 85%, 1.6 = 95%
	const phat = up / n;
  const rate = Math.round((phat+z*z/(2*n)-z*Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n)*1000000000)
	return rate;
};
    
export const formatDate = (date) => {
    // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
    let d = date;
    d = [
      '0' + d.getDate(),
      '0' + (d.getMonth() + 1),
      '' + d.getFullYear()
    //].map(component => component.slice(-4)); // взять последние 2 цифры из каждой компоненты
].map((component, i) => i < 2 ? component.slice(-2) : component);
    // соединить компоненты в дату
    return d.slice(0, 3).join('.');
  };
  
  export const formatTime = (date) => {
    // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
    let d = date;
    d = [
      '0' + d.getHours(),
      '0' + d.getMinutes()
    ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты
  
    // соединить компоненты в дату
    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
  };
