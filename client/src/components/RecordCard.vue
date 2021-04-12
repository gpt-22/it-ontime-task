<template>
  <div class="record-card">
    <h1 class="record-card__title">
      <router-link :to="`/records/${id}`">
        {{ title }}
      </router-link>
    </h1>
    <div class="record-card__text">
      {{ formattedText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordCard',

  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },

  computed: {
    formattedText() {
      const words = this.text.split(' ')
      let text = words.slice(0, 15).join(' ')
      if (words.length > 15) text += '...'
      return text
    }
  }
}
</script>

<style lang="scss" scoped>
.record-card {
  height: 150px;
  padding: 15px 10px;
  border: 2px solid #42b983;
  border-radius: 1em;
  text-align: left;

  &__title {
    border-bottom: 1px solid #2c3e50;
  }
}
</style>
