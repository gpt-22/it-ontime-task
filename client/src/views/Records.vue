<template>
  <div class="records-page">
    <div class="records-grid">
      <RecordCard
        v-for="card in records"
        :key="card._id"
        :id="card._id"
        :title="card.title"
        :text="card.text"
      />
    </div>

    <div class="new-record">
      <form
        class="new-record__form"
        @submit.prevent="createRecord"
      >
        <input
          type="text"
          placeholder="Название записи"
          class="new-record__title"
          v-model.trim="newRecordTitle"
        >
        <textarea
          type="text"
          placeholder="Текст записи"
          rows="15"
          class="new-record__text"
          v-model.trim="newRecordText"
        />
        <button
          type="submit"
          class="btn"
        >
          Создать запись
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RecordCard from '@/components/RecordCard.vue'
import { request } from '@/servises/api-requests'
import { Record } from '@/types/record'

export default defineComponent({
  name: 'Home',

  components: {
    RecordCard
  },

  data() {
    return {
      records: [] as Record[],
      newRecordTitle: '' as string,
      newRecordText: '' as string
    }
  },

  async mounted() {
    this.records = (await request('/records')).items
  },

  methods: {
    async createRecord() {
      if (this.newRecordTitle.length && this.newRecordText.length) {
        const body = {
          title: this.newRecordTitle,
          text: this.newRecordText
        }
        const createdRecord = await request('/records', 'POST', body)
        this.records.push(createdRecord)
      }
    }
  }
})
</script>

<style lang="scss">
@import "../assets/styles/vars";
@import "../assets/styles/common";

.records-page {
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 300px;
}

.new-record {
  &__form {
    width: 300px;
    margin: 0 auto 2em;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 3px solid $color-primary;
    border-radius: .5em;
  }

  &__title, &__text {
    padding: .25em;
    border: 2px solid #fff;
    outline: none;
    font-size: 1em;
  }

  &__title {}

  &__text {
    resize: none;
  }
}
.records-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 0 30px 0 0;
}
</style>
