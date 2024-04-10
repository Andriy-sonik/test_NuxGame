<template>
  <div class="todo-item">
    <span class="todo-item__username">userId: {{ item.userId }}</span>
    <div class="todo-item__wrapper">
      <input type="checkbox" :checked="item.completed" @change="$emit('onChange')" />
      <p>{{ item.title }}</p>
      <my-button
        @click="$emit('addToFavorite', item.id)"
        :class="[item.favorite ? 'error' : 'success']"
      >
        {{ item.favorite ? 'Remove from favorites' : 'Add to favorites' }}
      </my-button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({ userId: null, id: null, title: '', completed: false })
  }
})

defineEmits(['addToFavorite', 'onChange'])
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  &__username {
    font-size: 15px;
    font-style: italic;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 20px 1fr auto;
    gap: 10px;

    @media (max-width: 720px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
  button {
    width: max-content;
    @media (max-width: 720px) {
      width: 100%;
    }
  }
  input {
    padding: 10px;
    width: 20px;
    height: 20px;
  }
  p {
    font-size: 15px;
    line-height: 21px;
    text-overflow: ellipsis;
  }
}
</style>
