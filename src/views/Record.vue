<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <form v-else class="form" v-on:submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id"
          >{{cat.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.required"
          class="helper-text invalid"
        >
          Введите сумму</span>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
          Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
export default {
  name: 'Record',
  data: () => ({
    select: null,
    loading: true,
    category: null,
    categories: [],
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      // type модель для радиобаттонов
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            category: this.categories.find(c => c.id === this.category).title,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`недостаточно средств на счете (${this.amount - this.info.bill})`)
      }
    }
  },
  async mounted () {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
      if (this.categories.length) {
        this.category = this.categories[0].id
      }
      // тут нужно воспользоваться хаком. Изза loading он не успевает инициализировать плагин. т.к. код синхронный
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        this.select = M.FormSelect.init(this.$refs.select)
        // eslint-disable-next-line no-undef
        M.updateTextFields()
      }, 0)
    } catch (e) {}
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
