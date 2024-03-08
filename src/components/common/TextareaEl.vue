<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="name"
      :class="`font-semibold ${!!errorMessage && 'text-secondary-main'}`"
      >{{ label }}</label
    >
    <div class="w-full relative">
      <span v-if="maxLength" class="text-xs text-secondary-dark absolute top-1 right-2"
        >{{ value.length }}/{{ maxLength }}</span
      >
      <textarea
        :class="`w-full border-2 rounded-md pt-4 pb-2 px-2 outline-0 resize-none ${conditionInputClass}`"
        :name="name"
        :id="name"
        :value="value"
        :maxlength="maxLength"
        rows="7"
        @input="onInput"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import { getInputClass } from '@/helpers'

export default defineComponent({
  name: 'TextareaEl',
  props: {
    label: String,
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    errorMessage: String,
    maxLength: Number
  },
  setup(props, { emit }: SetupContext) {
    const conditionInputClass = computed(() => getInputClass(!!props.errorMessage))

    const onInput = (event: Event) => {
      emit('on-input', (event.target as HTMLInputElement).value)
    }

    return { conditionInputClass, onInput }
  }
})
</script>
