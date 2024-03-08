<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="name"
      class="font-semibold"
      :class="[!!errorMessage && 'text-secondary-main']"
      >{{ label }}</label
    >
    <input
      :class="`border-b-2 outline-0 ${conditionInputClass}`"
      type="text"
      :name="name"
      :id="name"
      :value="value"
      :maxlength="maxLength"
      @input="onInput"
    />
    <span v-if="errorMessage" class="text-xs text-secondary-main mt-1">{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue'
import { getInputClass } from '@/helpers'

export default defineComponent({
  name: 'FieldEl',
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
