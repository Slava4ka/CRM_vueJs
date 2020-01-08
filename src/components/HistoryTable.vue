<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(rec, idx) in records" :key="rec.id">
      <td>{{idx+1}}</td>
      <td>{{rec.amount | currency('RUB')}}</td>
      <td>{{rec.date | date('dateTime')}}</td>
      <td>{{rec.categoryName}}</td>
      <td>
        <span
          :class="[rec.typeClass]"
          class="white-text badge"
        >
        {{rec.typeText}}
        </span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push('/detail_record/'+rec.id)"
          v-tooltip:right="'Посмотреть запись'"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'HistoryTable',
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
