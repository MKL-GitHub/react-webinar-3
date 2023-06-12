import ObservableState from '../../utils/observable-state';
import * as translations from './translations';

class I18n extends ObservableState {
  constructor(services, config = {}, initState) {
    super(initState);
    this.services = services;
    this.config = config;
    this.state = { ...this.getState(), lang: 'ru' };
  }

  /**
   * Установка языка сессии
   * @param {String} lang Язык сессии
   */
  setLang(lang) {
    this.setState({
      ...this.getState(), lang
    });
  }

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(lang, text, plural) {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18n;
