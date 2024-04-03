<template>
  <div class="todo-item">
    <span>userId: {{ item.userId }}</span>
    <div>
      <input type="checkbox" :checked="item.completed" />
      <h3>{{ item.title }}</h3>
      <my-button @click="$emit('addToFavorite', item.id)">
        {{ item.favorite ? 'видалити з обраних' : 'додати в обрані' }}
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({ userId: null, id: null, title: '', completed: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    gap: 10px;
  }
}
</style>
