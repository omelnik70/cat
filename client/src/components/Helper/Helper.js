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
