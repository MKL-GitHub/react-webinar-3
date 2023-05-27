import StoreModule from "../module";
import * as languages from './exports';

class Interpreter extends StoreModule {
  initState() {
    return {
      lang: 'russian',
      languages: [...Object.keys(languages)],
    }
  }

  /**
   * Переключает язык интерфейса
   * @param {String} lang Язык на который переключяем
   */
  switchLanguage(lang) {
    this.setState({
      ...this.getState(), lang
    });
  }

  /**
   * Переводит слово с английского языка
   * @param {String} key Слово на английском языке для перевода
   * @returns {String} Перевод слова
   */
  translate(key, isCountable = false) {
    const { lang } = this.getState();
    const word = isCountable
      ? languages[lang].countableWords[key]
      : languages[lang].words[key];

    return word ? word : isCountable
      ? languages['english'].countableWords[key]
      : languages['english'].words[key];
  }
}

export default Interpreter;
