const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Функция определяет правильное склонение слова "раз" в зависимости от переданного числа
 * @param count {Number} Число, для которого нужно определить склонение слова "раз"
 * @returns {String} Склонение слова "раз" в соответствии с переданным числом
*/
export function getPluralCountWord(count) {
  const numberStr = count.toString();
  const lastDigit = +numberStr[numberStr.length - 1];

  return lastDigit >= 2 && lastDigit <= 4 &&
    count !== 12 && count !== 13 && count !== 14
    ? "раза"
    : "раз";
}
