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
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const userId = await dispatch('getUserId')
        const records = (await firebase.database().ref(`/users/${userId}/records`)
          .once('value')).val() || {}
        return Object.keys(records).map(key => {
          // в category это реализовано по другому
          return { ...records[key], id: key }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const userId = await dispatch('getUserId')
        const record = (await firebase.database().ref(`/users/${userId}/records`)
          .child(id).once('value')).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
