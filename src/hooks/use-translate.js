import { useCallback, useState, useMemo, useLayoutEffect } from "react";
import useServices from "./use-services";
import shallowEqual from "shallowequal";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const lang = useI18nSelector(state => state.lang);
  const setLang = useCallback(lang => i18n.setLang(lang), []);
  const t = useCallback((text, number) => i18n.translate(lang, text, number), [lang]);

  return useMemo(() => ({
    t, lang, setLang
  }), [lang])
}

/**
 * Хук для выборки данных из i18n и отслеживания их изменения
 * доступен только внутри хука useTranslate
 * @param {Function} selectorFunc 
 * @return {*}
 */
function useI18nSelector(selectorFunc) {
  const { i18n } = useServices();
  const [state, setState] = useState(() => selectorFunc(i18n.getState()));

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18n.subscribe(() => {
      const newState = selectorFunc(i18n.getState());
      setState(prevState => shallowEqual(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от i18n при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
