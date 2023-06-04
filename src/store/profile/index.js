import StoreModule from '../module';

/**
 * Информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      user: null,
      token: localStorage.getItem('token'),
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
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': 'fa57a7348079cd27f06260b99881e6d2b2fee56cff8e212a2cc2e89e0234243'
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();

    if (response.ok) {
      this.setMistake(null);
      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: {
          ...json.result.user.profile,
          email: json.result.user.email
        },
      })
      localStorage.setItem('token', json.result.token);
      return true;
    }

    const mistakeText = json.error.data.issues
      .map(issue => issue.message)
      .join('\n');
    this.setMistake(mistakeText);
    return false;
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
      localStorage.removeItem('token');
      this.setState(this.initState());
    }
  }

  /**
   * Загрузка профиля через токен для авторизованного пользователя
   */
  async loadProfile() {
    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    });

    if (response.ok) {
      const { result } = await response.json();
      this.setState({
        ...this.getState(),
        user: {
          ...result.profile,
          email: result.email
        },
      })
    }
  }

  /**
   * Установка ошибки полученной от сервера при регистрации
   * @param {String} loginMistake Текст ошибки
   */
  setMistake(loginMistake) {
    this.setState({ ...this.getState(), loginMistake });
  }
}

export default ProfileState;