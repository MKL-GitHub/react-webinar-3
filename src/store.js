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
   * @param newState
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getCartState() {
    return this.cartState;
  }

  /**
   * Установка состояния корзины
   * @param newCartState 
   */
  setCartState(newCartState) {
    newCartState.list.sort((a, b) => a.code - b.code);
    this.cartState = newCartState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToCart(code) {
    const item = this.state.list.find(item => item.code === code);
    const cartItem = this.cartState.list.find(item => item.code === code);
    let newCartState = {};

    newCartState.list = cartItem
      ? [...this.cartState.list.filter(item => item.code !== code),
      { ...item, quantity: cartItem.quantity + 1 }]
      : [...this.cartState.list, { ...item, quantity: 1 }];

    newCartState.totalPrice = this.cartState.totalPrice + item.price;
    newCartState.isOpen = this.cartState.isOpen;

    this.setCartState(newCartState);
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  removeItemFromCart(code) {
    const cartItem = this.cartState.list.find(item => item.code === code);
    let newCartState = {};

    newCartState.list = [...this.cartState.list.filter(item => item.code !== code)];
    if (cartItem.quantity !== 1) {
      newCartState.list.push({ ...cartItem, quantity: cartItem.quantity - 1 });
    }
    newCartState.totalPrice = this.cartState.totalPrice - cartItem.price;
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
   * @param code
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
   * @param code
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
