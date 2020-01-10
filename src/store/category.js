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
      try {
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
      } catch (e) {
        commit('setError', e)
        throw e
      }
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
    },
    async deleteCategory ({ commit, dispatch }, id) {
      console.log('id ' + id)
      try {
        const userId = await dispatch('getUserId')
        await firebase.database().ref(`/users/${userId}/categories`)
          .child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id) {
      try {
        const userId = await dispatch('getUserId')
        const category = (await firebase.database().ref(`/users/${userId}/categories`)
          .child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }

  }
}
