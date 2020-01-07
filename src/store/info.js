import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo ({ dispatch, commit }) {
      try {
        const userId = await dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${userId}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo ({ dispatch, commit }, toUpdate) {
      try {
        const userId = await dispatch('getUserId')
        const updateData = { ...this.getters.info, ...toUpdate }
        await firebase.database().ref(`/users/${userId}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    // не совсем понимаю как это работает. Надо уточнить!!!!
    info: s => s.info
  }
}
