/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.largestCodeNumber = Math.max(...this.state.list.map(item => item.code));
    this.listeners = []; // Слушатели изменений состояния
    this.state.list.forEach(item => item.selectedCount = 0); // Для каждого элемента добавляем количество выделений
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {
        code: ++this.largestCodeNumber,
        title: 'Новая запись',
        selectedCount: 0
      }]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи и подсчет выделений по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.selected && item.code !== code) {
          item.selected = false;
        }
        if (item.code === code) {
          item.selected = !item.selected;
        }
        if (item.selected) {
          item.selectedCount++;
        }
        return item;
      })
    })
  }
}

export default Store;
