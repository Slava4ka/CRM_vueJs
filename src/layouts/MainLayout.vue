<template>
    <div class="app-main-layout">
      <Navbar @hideOrOpenSidebar="isOpen = !isOpen"/>
      <Sidebar v-model="isOpen" :key="locale"/>
      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip:left="'CreateNewRecord'">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>

<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'
import messages from '../common/messages'
export default {
  name: 'MainLayout',
  components: {
    Navbar, Sidebar
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      // обращаюсь к методу в message.plugin
      this.$error(messages[fbError.code] || fbError.message)
    }
    /*    locale () {
      console.log('locale change')
    } */
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
