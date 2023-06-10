/**
 * Нахождение последнего вложенного дочернего элемента у объекта
 * @param {Object} item Объект поиска
 */
export function findLastChild(item) {
  return item.children.length
    ? findLastChild(item.children[item.children.length - 1])
    : item;
}