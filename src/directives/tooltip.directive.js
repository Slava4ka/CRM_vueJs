// Элегантный способ создания всплывающих окон (тултипов), который предоставляет vue

export default {
// эта функция будет вызвана, когда тултип будет проходит инициализацию
  /**
   *
   * @param el - объект элемента (DOM) к которому добавляем директиву
   * @param value - некий объект с полем value. Его будем добавлять в директиву
   * @param arg
   */
  bind (el, { value, arg }) {
    const position = arg || 'bottom'
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, { html: value, position: position })
  },
  // метод для удаления толтипа. Нужен при смерти компонента, использующего его.
  // Предотвращает утечку памяти и наличие лишнего html кода
  unbind (el) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
