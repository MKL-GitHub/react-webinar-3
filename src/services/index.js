import APIService from "./api";
import I18n from "./i18n";
import Store from "./store";
import createStoreRedux from "./store-redux";

class Services {
  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    return this._api ??= new APIService(this, this.config.api);
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    return this._store ??= new Store(this, this.config.store);
  }

  /**
   * Redux store
   */
  get redux() {
    return this._redux ??= createStoreRedux(this, this.config.redux);
  }

  /**
   * Сервис мультиязычности
   * @returns {I18n}
   */
  get i18n() {
    return this._i18n ??= new I18n(this, this.config.i18n);
  }
}

export default Services;
