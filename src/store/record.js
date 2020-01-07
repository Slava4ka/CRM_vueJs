import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        const userId = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${userId}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
