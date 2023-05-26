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
  translate(key, countKey) {
    const { lang } = this.getState();
    return countKey
      ? languages[lang].countableWords[key][countKey]
      : languages[lang].words[key];
  }
}

export default Interpreter;
