import StoreModule from '../module';

/**
 * Информация об авторизации
 */
class AuthState extends StoreModule {
  initState() {
    return {
      token: localStorage.getItem('token'),
      mistake: null,
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
      })
      localStorage.setItem('token', json.result.token);
      localStorage.setItem('userId', json.result.user._id);
      return json.result.user;
    }

    this.setMistake(json.error.data.issues
      .map(issue => issue.message)
      .join('\n'));
  }

  /**
   * Сброс авторизации пользователя
   */
  async logout() {
    // console.log('in')
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    })
    // console.log(response)
    if (response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.setState(this.initState());
    }
  }

  /**
   * Установка ошибки полученной от сервера при регистрации
   * @param {String} mistake Текст ошибки
   */
  setMistake(mistake) {
    this.setState({ ...this.getState(), mistake });
  }
}

export default AuthState;