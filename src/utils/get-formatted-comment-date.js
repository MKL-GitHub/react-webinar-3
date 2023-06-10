/**
 * Получение даты в необходимом для комментария формате
 * @param {String} dateStr Дата в виде строки
 * @param {String} lang Локализация
 * @returns {String} Отформатированная дата
 */
export function getFormatedCommentDate(dateStr, lang = 'ru-RU') {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString(lang,
    { year: 'numeric', month: 'long', day: 'numeric' }).replace(' г.', '');
  const formattedTime = date.toLocaleTimeString(lang,
    { hour: '2-digit', minute: '2-digit' });

  return `${formattedDate} ${lang === 'ru-RU' ? 'в' : 'at'} ${formattedTime}`;
}