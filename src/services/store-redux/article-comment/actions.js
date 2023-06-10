export default {
  /**
   * Отправка комментария к товару
   * @param {Object} body 
   * @return {Function}
   */
  send: (body) => {
    return async (dispatch, getState, services) => {
      try {
        const res = await services.api.request({
          url: '/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)',
          method: 'POST',
          body: JSON.stringify(body),
        });

        // Товар загружен успешно
        dispatch({ type: 'article-comment/post-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'article-comment/post-error' });
      }
    }
  },

  /**
   * Сброс состояния комментария
   * @returns {Object}
   */
  reset: () => {
    return { type: 'article-comment/reset' };
  },
}
