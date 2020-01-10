<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div v-else class="row">
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">
          {{'NoCategories' | localize}}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'

export default {
  name: 'Categories',
  metaInfo () {
    return { title: this.$title('Menu_Categories') }
  },
  data: () => ({
    categories: [],
    loading: true,
    // нужно для фарсированной перерисовки
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (actionType, category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      if (actionType === 'update' && idx !== -1) {
        this.categories[idx].title = category.title
        this.categories[idx].limit = category.limit
      } else if (actionType === 'delete' && idx !== -1) {
        this.categories.splice(idx, 1)
      } else {
        this.$message('Ошибка при обновлении списка категорий')
      }
      // перерисовываем компоненту
      this.updateCount += 1.01
    }
  }
}
</script>

<style scoped>

</style>
