export default {
  /**
   * Загрузка комментариев товара
   * @param {String} id Идентификатор товара
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: 'article-comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments/?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(_id, profile(name)),isDeleted,parent(_id,_type))`
        });

        // Товар загружен успешно
        dispatch({ type: 'article-comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article-comments/load-error' });
      }
    }
  },

  /**
   * Добавление нового комментария
   * @param {Object} item Объект комментария
   * @returns {}
   */
  add: (item) => {
    return {
      type: 'article-comments/add',
      payload: { item },
    }
  }
}
