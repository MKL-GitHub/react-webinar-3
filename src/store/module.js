/**
 * Базовый класс для модулей хранилища
 * Для гурппировки действий над внешним состоянием
 */
class StoreModule {
  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  /**
   * Инициализация начального состояния
   * @returns {Object}
   */
  initState() {
    return {}
  }

  /**
   * Получение состояния
   * @returns {Object}
   */
  getState() {
    return this.store.getState()[this.name];
  }

  /**
   * Установка состояние
   * @param {Object} newState Новое состояние
   * @param {String} description Описание действия
   */
  setState(newState, description = 'setState') {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: newState
    }, description)
  }

}

export default StoreModule;
