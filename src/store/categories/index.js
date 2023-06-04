import StoreModule from '../module';

/**
 * Информация о категориях товаров
 */
class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [{ _id: 'all', title: 'Все', parent: null }],
    }
  }

  /**
 * Установка категорий товаров 
 */
  async setCategories() {
    this.setState(this.initState(), 'Устанавливает состояние по умолчанию');

    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: [...this.getState().list, ...json.result.items],
    }, 'Загрузка категорий товаров из АПИ');
  }
}

export default CategoriesState;