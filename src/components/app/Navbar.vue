<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('hideOrOpenSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <!-- тут используются фильтры. Зарегестрирован в main, поэтому в глобальной зоне видимости -->
        <span class="black-text">{{date | date('datetime')}}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  mounted () {
    // после создания активирует дропдаун
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, { constrainWidth: true })
    // изменяет значение date для отражения текущего времени
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    // нужно для предотвращения утечки памяти.
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  },
  methods: {
    async logout () {
      console.log(this.$store)
      await this.$store.dispatch('logout')
      console.log('LogOut')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  })
}
</script>

<style scoped>

</style>
