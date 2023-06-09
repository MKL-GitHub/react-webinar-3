// Начальное состояние
const initialState = {
  data: null,
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comment/post-success":
      return { ...state, data: action.payload.data };

    case "article-comment/post-error":
      return state; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
