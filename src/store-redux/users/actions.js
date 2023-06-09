export default {
  /**
   * Загрузка пользователей
   * @return {Function}
   */
  load: () => {
    return async (dispatch, getState, services) => {
      // Сброс текущего состояния пользователей и установка признака ожидания загрузки
      dispatch({ type: 'users/load-start' });

      try {
        const res = await services.api.request({ url: `/api/v1/users?limit=*&fields_id,profile(name)` });
        // Пользователи успешно загружены
        dispatch({ type: 'users/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'users/load-error' });
      }
    }
  },
}
