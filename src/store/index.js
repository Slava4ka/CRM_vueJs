import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

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
    async fetchCurrency ({ commit }) {
      try {
        // получает с стороннего сервиса текущий курс валют
        // const key = process.env.VUE_APP_FIXER
        // const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`)
        return await res.json()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    error: s => s.error,
    billLoading: b => b.billLoading
  },
  modules: {
    auth, info, category, record
  }
})
