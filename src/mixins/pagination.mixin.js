// Тот же самый объект, что описывается в VueJS (data)
// При добавлении он будет смержен с data
import _ from 'lodash'
export default {
  data () {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    setupPagination (allItems) {
      // eslint-disable-next-line no-unused-expressions
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
