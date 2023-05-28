import StoreModule from "../module";

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0
    }
  }

  /**
   * Получение товара из корзины по ID 
   * @param {String} _id Идентификатор товара
   * @param {Object} state Объект для хранения свойств sum и isExist
   * @returns {Array<Object>} Список товаров
   */
  getItemFromBasketById(_id, state) {
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        state.isExist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      state.sum += result.price * result.amount;
      return result;
    });
    return list;
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  addToBasketById(_id) {
    const state = { sum: 0, isExist: false };
    // Ищем товар в корзине, чтобы увеличить его количество
    const list = this.getItemFromBasketById(_id, state);

    if (!state.isExist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      // @todo В реальном приложении будет запрос к АПИ вместо поиска по состоянию.
      const item = this.store.getState().catalog.list.find(item => item._id === _id);
      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      state.sum += item.price;
    }

    this.setState({
      ...this.getState(),
      list,
      sum: state.sum,
      amount: list.length
    }, 'Добавление в корзину');
  }

  /**
   * Добавление товара в корзину
   * @param {Object} newItem Объект товара
   */
  addToBasket(newItem) {
    const state = { sum: 0, isExist: false };
    // Ищем товар в корзине, чтобы увеличить его количество
    const list = this.getItemFromBasketById(newItem._id, state);

    if (!state.isExist) {
      list.push({ ...newItem, amount: 1 }); // list уже новый, в него можно пушить.
      state.sum += newItem.price; // Добавляем к сумме.
    }

    this.setState({
      ...this.getState(),
      list,
      sum: state.sum,
      amount: list.length,
    }, 'Добавление в корзину');
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState({
      ...this.getState(),
      list,
      sum,
      amount: list.length
    }, 'Удаление из корзины');
  }
}

export default Basket;
