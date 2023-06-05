import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false,
    }
  }

  /**
   * Загрузка профиля по id через токен для авторизованного пользователя
   * @param {String} id Идентификатор пользователя
   */
  async load(id) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      ...this.initState(),
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const { result } = await response.json();
        this.setState({
          ...this.getState(),
          waiting: false,
          data: {
            name: result.profile.name,
            phone: result.profile.phone,
            email: result.email,
          }
        });
      }
    } catch (error) {
      this.setState(this.initState());
    }
  }

  /**
   * Сброс состояния профиля
   */
  resetState() {
    this.setState({
      data: {},
      waiting: false
    });
  }
}

export default ProfileState;