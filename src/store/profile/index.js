import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
    }
  }

  /**
   * Сброс состояния профиля
   */
  resetState() {
    this.setState(this.initState());
  }

  /**
   * Установка нового состояния профиля
   * @param {Object} newState Новое состояние 
   */
  setProfilePageState(newState) {
    this.setState({ ...this.getState(), ...newState });
  }
}

export default ProfileState;