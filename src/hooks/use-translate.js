import { useCallback } from "react";
import useSelector from "./use-selector";
import useServices from "./use-services";
import useStore from "./use-store";
import { useMemo } from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const store = useStore();
  const { i18n } = useServices();
  // Текущая локаль
  const lang = useSelector(state => state.locale.lang);
  // Функция для смены локали
  const setLang = useCallback(lang => store.actions.locale.setLang(lang), []);
  // Функция для локализации текстов
  const t = useCallback((text, number) => i18n.translate(lang, text, number), [lang]);

  return useMemo(() => ({
    // Код локали
    lang,
    // Функция для смены локали
    setLang,
    // Функция для локализации текстов с замыканием на код языка
    t,
  }), [lang]);
}
