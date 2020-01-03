// Для распространённых задач форматирования текста во Vue используются фильтры. Они находят своё применение
// в двух местах: в mustache-интерполяциях и в выражениях v-bind (последнее поддерживается в 2.1.0+).
// Фильтры добавляются в конце выражения JavaScript и отделяются вертикальной чертой
// https://ru.vuejs.org/v2/guide/filters.html
// Intl.DateTimeFormat - стандартный класс для форматирования вывода даты/времени
export default function dateFilter (value, format = 'date') {
  const options = {}
  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(value))
}
