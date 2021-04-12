<template>
  <div class="record-page">
    <div class="record">
      <input
        type="text"
        class="record__title"
        v-model="title"
        @change="update"
      >
      <textarea
        name="text"
        id="text"
        class="record__text"
        rows="15"
        v-model="text"
        @change="update"
      ></textarea>
      <button
        class="btn record__btn record__btn_delete"
        @click="deleteRecord"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { request } from '@/servises/api-requests'
import { Record } from '@/types/record'

export default defineComponent({
  name: 'Home',

  data() {
    return {
      record: {} as Record,
      title: '' as string,
      text: '' as string
    }
  },

  async mounted() {
    this.record = await request(`/records/${this.$route.params.id}`)
    this.title = this.record.title
    this.text = this.record.text
  },

  methods: {
    async update() {
      const body: Record = {
        ...this.record,
        title: this.title,
        text: this.text
      }
      this.record = await request(`/records/${this.$route.params.id}`, 'PUT', body)
    },
    async deleteRecord() {
      const info = await request(`/records/${this.$route.params.id}`, 'DELETE')
      if (info.status === 'OK') {
        await this.$router.push('/records')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";
@import "../assets/styles/common";

.record-page {
  display: flex;
  justify-content: center;
}
.record {
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid $color-primary;
  border-radius: .5em;

  &__title, &__text, &__btn {
    width: 100%;
    margin: 0 0 15px 0;
  }

  &__title, &__text {
    padding: .25em;
    border: 2px solid #fff;
    outline: none;
    font-size: 1em;
  }

  &__title:focus, &__text:focus {
    border: 2px solid $color-secondary;
    border-radius: .25em;
  }

  &__title {
    border-bottom: 2px solid $color-primary;
  }

  &__text {
    resize: none;
  }

  &__btn {
    background-color: #ff5f5f;

    &_delete {
      margin: 0;
    }
  }
}
</style>
