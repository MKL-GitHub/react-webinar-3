// Начальное состояние
const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "article-comments/load-start":
      return { ...state, data: {}, waiting: true };

    case "article-comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "article-comments/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    case "article-comments/add":
      return {
        ...state,
        data: {
          ...state.data,
          items: [...state.data.items,
          action.payload.item],
        }
      }
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
