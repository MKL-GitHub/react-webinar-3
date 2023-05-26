import StoreModule from "../module";

class Modals extends StoreModule {
  initState() {
    return {
      name: null
    }
  }

  /**
   * Открывает модальное окно по имени
   * @param {String} name Название модального окна
   */
  open(name) {
    this.setState({ name }, `Открытие модалки ${name}`);
  }

  /**
   * Закрывает модальное окно
   */
  close() {
    this.setState({ name: null }, `Закрытие модалки`);
  }
}

export default Modals;
