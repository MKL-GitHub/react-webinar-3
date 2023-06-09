export function getFormatedCommentDate(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString('ru-RU',
    { year: 'numeric', month: 'long', day: 'numeric' }).replace(' г.', '');
  const formattedTime = date.toLocaleTimeString('ru-RU',
    { hour: '2-digit', minute: '2-digit' });

  return `${formattedDate} в ${formattedTime}`;
}