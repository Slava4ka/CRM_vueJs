<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create' | localize}}</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="CategoryCreate_name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="CategoryCreate_name">{{'Title' | localize}}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
          >
            {{'Message_CategoryTitle' | localize}}
          </span>
        </div>

        <div class="input-field">
          <!-- limit.number приводит к числу модель -->
          <input
            id="CategoryCreate_limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="CategoryCreate_limit">{{'Limit' | localize}}</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
          >{{'Message_MinLength' | localize}} {{$v.limit.$params.minValue.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  name: 'CategoryCreate',
  data: () => ({
    title: '',
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    M.updateTextFields()
    // нужно для корректного отображения значений по умолчанию. Чтоб label на налезал
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      console.log('Some server code')
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 100
        this.$message('Категория была создана')
        this.$emit('created', category)
        this.$v.reset()
      } catch (e) {}
    }
  }
}
</script>
<style scoped>

</style>
