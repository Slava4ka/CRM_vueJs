import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    billLoading: true
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setBillLoading (state, status) {
      state.billLoading = status
    }
  },
  actions: {
    async fetchCurrency () {
      // получает с стороннего сервиса текущий курс валют
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      // await
      return res.json()
    }
  },
  getters: {
    error: s => s.error,
    billLoading: b => b.billLoading
  },
  modules: {
    auth, info, category
  }
})
