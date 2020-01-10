<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import messages from '../common/messages'
export default {
  name: 'EmptyLayout',
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      // обращаюсь к методу в message.plugin
      this.$error(messages[fbError.code] || fbError.message)
    }
  }
}
</script>

<style scoped>

</style>
