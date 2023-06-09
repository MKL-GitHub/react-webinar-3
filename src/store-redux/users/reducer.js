// Начальное состояние
const initialState = {
  data: {},
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "users/load-start":
      return { ...state, data: {}, waiting: true };

    case "users/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "users/load-error":
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранить?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
