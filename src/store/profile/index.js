import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      user: null,
      token: '',
      isAuthorized: false,
      loginMistake: null,
    }
  }

  /**
   * Авторизация пользователя
   * @param {String} login Логин 
   * @param {String} password Пароль 
   */
  async login(login, password) {
    const body = { login, password };
    const token = localStorage.getItem('token');

    if (token) {
      this.loadProfile(token);
    } else {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': 'fa57a7348079cd27f06260b99881e6d2b2fee56cff8e212a2cc2e89e0234243'
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        this.setMistake(null);
        const { result } = await response.json();
        this.setState({
          ...this.getState(),
          isAuthorized: true,
          token: result.token,
          user: {
            ...result.user.profile,
            email: result.user.email
          },
        })
        localStorage.setItem('token', result.token);
      } else {
        this.setMistake(response.statusText);
      }
    }
  }

  /**
   * Сброс авторизации пользователя
   */
  async logout() {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    })
    if (response.ok) {
      this.setState(this.initState());
      localStorage.removeItem('token');
    } else {
      this.setMistake(response.statusText);
    }
  }

  /**
   * Загрузка профиля через токен для авторизованного пользователя
   * @param {String} token Токен
   */
  async loadProfile(token) {
    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

    if (response.ok) {
      const { result } = await response.json();
      this.setState({
        ...this.getState(),
        isAuthorized: true,
        token,
        user: {
          ...result.profile,
          email: result.email
        },
      })
    }
  }

  /**
   * Установка ошибки полученной от сервера при регистрации
   * @param {String} loginMistake Описание ошибки
   */
  setMistake(loginMistake) {
    this.setState({ ...this.getState(), loginMistake });
  }
}

export default ProfileState;