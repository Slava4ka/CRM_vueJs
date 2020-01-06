import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try {
        const userId = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${userId}/categories`)
          .push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories ({ commit, dispatch }) {
      const userId = await dispatch('getUserId')
      const categories = (await firebase.database().ref(`/users/${userId}/categories`)
        .once('value')).val() || {}
      return Object.keys(categories).map(key => {
        return {
          title: categories[key].title,
          limit: categories[key].limit,
          id: key
        }
      })
    },
    async updateCategory ({ commit, dispatch }, { id, title, limit }) {
      try {
        const userId = await dispatch('getUserId')
        await firebase.database().ref(`/users/${userId}/categories`)
          .child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  }
}
