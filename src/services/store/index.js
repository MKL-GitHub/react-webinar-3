import ObservableState from '../../utils/observable-state.js';
import * as modules from './exports.js';

/**
 * Хранилище состояния приложения
 */
class Store extends ObservableState {
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {}, initState = {}) {
    super(initState);
    this.services = services;
    this.config = config;
    this.listeners = []; // Слушатели изменений состояния
    // this.state = initState;
    /** @type {{
     * basket: BasketState,
     * catalog: CatalogState,
     * modals: ModalsState,
     * article: ArticleState,
     * categories: CategoriesState,
     * session: SessionState,
     * profile: ProfileState
     * }} */
    this.actions = {};
    for (const name of Object.keys(modules)) {
      this.actions[name] = new modules[name](this, name, this.config?.modules[name] || {});
      this.state[name] = this.actions[name].initState();
    }
  }
}

export default Store;
