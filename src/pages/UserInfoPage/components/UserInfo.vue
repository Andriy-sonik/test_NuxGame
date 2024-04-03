<template>
  <table class="table">
    <tr v-for="(value, nameKey) in userInfo" :key="value">
      <th>{{ nameKey }}</th>
      <td v-if="typeof value === 'object'">
        <tr v-for="(sub_value, sub_nameKey) in value" :key="sub_value">
          <th>{{ sub_nameKey }}</th>
          <td>{{ sub_value }}</td>
        </tr>
      </td>
      <th v-else>{{ value }}</th>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    userInfo: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped></style>
