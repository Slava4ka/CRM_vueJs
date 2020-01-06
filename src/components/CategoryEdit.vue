<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
            {{cat.title}}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="CategoryEdit_name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="CategoryEdit_name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            Введите название категории
          </span>
        </div>

        <div class="input-field">
          <!-- limit.number приводит к числу модель -->
          <input
            id="CategoryEdit_limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="CategoryEdit_limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >Минимальная величина {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'CategoryEdit',
  props: {
    // ['categories'] можно просто так, а можно указывать тип
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    // select нужен для тега select
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    // сюда добавляется функция, которая совпадает по названию с той
    // моделью, за которой нужно следить
    current (categoryId) {
      // входящий параметр могу назвать как хочу
      // console.log('watch current', categoryId)
      const { title, limit } = this.categories.find(c => c.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  created () {
    // первый хук, который вызывается при инициализации компонента
    // мы знаем что тут что то есть, т.к. есть прверка
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    // привязываем логику к select
    // eslint-disable-next-line no-undef
    this.select = M.FormSelect.init(this.$refs.select)
    // eslint-disable-next-line no-undef
    M.updateTextFields()
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
