// Для распространённых задач форматирования текста во Vue используются фильтры. Они находят своё применение
// в двух местах: в mustache-интерполяциях и в выражениях v-bind (последнее поддерживается в 2.1.0+).
// Фильтры добавляются в конце выражения JavaScript и отделяются вертикальной чертой
// https://ru.vuejs.org/v2/guide/filters.html
// Intl.DateTimeFormat - стандартный класс для форматирования вывода даты/времени
import store from '../store'

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
  const locale = store.getters.info.locale || 'ru-RU'
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
