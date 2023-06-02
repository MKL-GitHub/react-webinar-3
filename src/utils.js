/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Получение отсортированного списка опций со вложенностью
 * @param {Array<Object>} items Список опций для компонента select
 * @returns {Array<Object>} Отсортированный список со вложенностью
 */
export function getHierarchicalOptions(items) {
  const result = [];
  items.forEach(item => !item.parent && setChildren(item));

  return result;

  function setChildren(item) {
    const children = items.filter(({ parent }) => parent?._id === item._id);
    result.push({ value: item._id, title: item.title });

    children.forEach(child => {
      child.dashes = item.dashes ? item.dashes + '-' : '-';
      child.title = child.dashes + child.title;
      setChildren(child)
      delete child.dashes;
    });
  }
}
