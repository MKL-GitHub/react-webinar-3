import StoreModule from "../module";

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      totalItems: 0,
      currentPage: 1,
    }
  }

  /**
   * Получение товаров от сервера и сохрание в store
   * @param {Number} limit Количество получаемых товаров
   * @param {Number} skip Количество товаров, которое необходимо пропустить
   */
  async load(limit, skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      currentPage: skip ? skip / limit + 1 : 1,
    }, 'Загружены товары из АПИ');
  }

  /**
   * Получение товара по id от сервера
   * @param {String} id Идентификатор товара
   * @returns {Object} Информация о товаре
   */
  async loadItemById(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    return json.result;
  }

  /**
   * Получение колличества всех товаров и сохранение в store
   */
  async loadTotalItemsQuantity() {
    const response = await fetch('/api/v1/articles?fields=items(),count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalItems: json.result.count,
    }, 'Загружено колличество всех товаров из АПИ');
  }
}

export default Catalog;
