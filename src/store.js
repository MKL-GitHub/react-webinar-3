import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.cartState = { list: [], totalPrice: 0, isOpen: false };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param {Function} listener
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
   * @param {Object} newState
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Выбор состояния корзины
   * @returns {Object}
   */
  getCartState() {
    return this.cartState;
  }

  /**
   * Установка состояния корзины
   * @param {Object} newCartState 
   */
  setCartState(newCartState) {
    newCartState.list.sort((a, b) => a.code - b.code);
    this.cartState = newCartState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину по коду
   * @param {Number} code
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    const cartItem = this.cartState.list.find(item => item.code === code);
    const newCartState = {};

    newCartState.list = cartItem
      ? [...this.cartState.list.filter(item => item.code !== code),
      { ...item, quantity: cartItem.quantity + 1 }]
      : [...this.cartState.list, { ...item, quantity: 1 }];

    newCartState.totalPrice = this.cartState.totalPrice + item.price;
    newCartState.isOpen = this.cartState.isOpen;

    this.setCartState(newCartState);
  }

  /**
   * Удаление товара из корзины по коду
   * @param {Number} code
   */
  removeItemFromCart(code) {
    const cartItem = this.cartState.list.find(item => item.code === code);
    const newCartState = {};

    newCartState.list = [...this.cartState.list.filter(item => item.code !== code)];
    newCartState.totalPrice = this.cartState.totalPrice - cartItem.price * cartItem.quantity;
    newCartState.isOpen = this.cartState.isOpen;

    this.setCartState(newCartState);
  }

  /**
   * Открытие корзины
   */
  openCartModal() {
    this.setCartState({ ...this.cartState, isOpen: true });
  }

  /**
   * Закрытие корзины
   */
  closeCartModal() {
    this.setCartState({ ...this.cartState, isOpen: false });
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }]
    })
  };

  /**
   * Удаление записи по коду
   * @param {Number} code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param {Number} code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      })
    })
  }
}

export default Store;
