<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else>
      <div class="page-title">
        <h3>{{'ProfileTitle' | localize}}</h3>
      </div>

      <form class="form" v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
          >
          <label for="description">{{'Name' | localize}}</label>
          <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
          {{'Message_EnterName' | localize}}
        </span>
        </div>

        <div class="switch">
          <label>
            {{'English' | localize}}
            <input type="checkbox" v-model="isRuLocale">
            <span class="lever"></span>
            {{'Russian' | localize}}
          </label>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Profile',
  data: () => ({
    loading: true,
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  async mounted () {
    if (Object.keys(this.info).length) {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU'
    } else {
      try {
        await this.fetchInfo
        this.name = this.info.name
        this.isRuLocale = this.info.locale === 'ru-RU'
      } catch (e) {
        this.$store.commit('setError', e)
        throw e
      }
    }
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields()
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info']),
    ...mapActions(['fetchInfo'])

  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
        this.$message('Настройки профиля успешно изменены')
      } catch (e) {
        this.$store.commit('setError', e)
        throw e
      }
    }
  }
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
