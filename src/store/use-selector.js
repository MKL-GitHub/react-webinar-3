import useStore from "./use-store";
import { useEffect, useMemo, useState } from "react";
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param {Function} selector 
 * @return {*}
 */
export default function useSelector(selector) {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
      const newState = selector(store.getState());
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
