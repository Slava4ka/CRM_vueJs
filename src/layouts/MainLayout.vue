<template>
    <div class="app-main-layout">
      <Navbar @hideOrOpenSidebar="isOpen = !isOpen"/>
      <Sidebar v-model="isOpen"/>
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record" v-tooltip:left="'Создать новую запись'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
export default {
  name: 'MainLayout',
  components: {
    Navbar, Sidebar
  },
  async mounted () {
    // все асинхронные запросы должны делаться тут (mounted)
    // к этому времени  уже html дерево готово
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.$store.commit('setBillLoading', false)
  },
  data: () => ({
    isOpen: true,
    loading: true
  })
}
</script>

<style scoped>

</style>
