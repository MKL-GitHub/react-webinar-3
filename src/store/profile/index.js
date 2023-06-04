import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {
        _id: localStorage.getItem('userId'),
      },
      waiting: false,
    }
  }

  /**
   * Загрузка профиля через токен для авторизованного пользователя
   */
  async load() {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      ...this.initState(),
      waiting: true
    });

    try {
      const response = await fetch(`/api/v1/users/${this.getState().data._id}`, {
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
            ...this.getState().data,
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

  /**
   * Установка нового состояния профиля
   * @param {Object} newData Новое состояние 
   */
  setProfileData(newData) {
    this.setState({
      ...this.getState(),
      data: {
        ...this.getState().data,
        ...newData,
      }
    });
  }
}

export default ProfileState;