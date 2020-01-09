<template>
  <div>
    <div class="page-title">
      <h3>{{'History_Title' | localize}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"> </canvas>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length">Записей пока нет</p>
    <section v-else>
      <HistoryTable :records="items" :page="page" :pageSize="pageSize"/>
      <Paginate  :page-count="pageCount"
                 :click-handler="pageChangeHandler"
                 :prev-text="'Back' | localize"
                 :next-text="'Forward' | localize"
                 :container-class="'pagination'"
                 :page-class="'waves-effect'"
                 v-model="page"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from '../components/HistoryTable'
import paginationMixin from '../mixins/pagination.mixin'
import { Pie } from 'vue-chartjs'
import localizeFilter from '../filters/localize.filter'

export default {
  name: 'History',
  extends: Pie,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  components: {
    HistoryTable
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup (categories) {
      this.setupPagination(this.records.map(r => {
        return {
          ...r,
          categoryName: categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === 'income' ? 'green' : 'red',
          typeText:
            r.type === 'income'
              ? localizeFilter('Income')
              : localizeFilter('Outcome')
        }
      }))
      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(c => {
            return this.records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              } return total
            }, 0)
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(122,107,255,0.2)',
            'rgba(255,79,235,0.2)',
            'rgba(44,255,47,0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(122,107,255,0.2)',
            'rgba(255,79,235,0.2)',
            'rgba(44,255,47,0.2)'
          ],
          borderWidth: 1
        }]
      })
    }
  }

}
</script>

<style scoped>

</style>
