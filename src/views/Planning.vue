<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader v-if="loading"/>
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет. <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>

      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate" :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '../filters/currency.filter'
export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  methods: {

  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(c => {
      // расчет потраченных средств для прогресс бара
      const spend = records
        .filter(r => r.categoryId === c.id)
        .filter(r => r.type === 'outcome')
        // первый параметр колбек (общее значение, текущая итерация), второй - начальное значение
        .reduce((total, record) => {
          // + перед record.amount для предотвращения появления string
          // eslint-disable-next-line no-return-assign
          return total += +record.amount
        }, 0)

      const percent = 100 * spend / c.limit
      const progressPercent = percent > 100 ? 100 : percent

      const progressColor = percent < 60 ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red'

      const tooltipValue = c.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышен на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

      return {
        ...c, progressPercent, progressColor, spend, tooltip
      }
    })

    console.log(this.categories)
    this.loading = false
  }
}
</script>

<style scoped>

</style>
