export function getFormatedCommentDate(dateStr, lang = 'ru-RU') {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString(lang,
    { year: 'numeric', month: 'long', day: 'numeric' }).replace(' г.', '');
  const formattedTime = date.toLocaleTimeString(lang,
    { hour: '2-digit', minute: '2-digit' });

  return `${formattedDate} в ${formattedTime}`;
}