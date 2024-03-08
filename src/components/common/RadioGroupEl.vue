<template>
  <RadioGroup v-model="selected">
    <RadioGroupLabel class="font-semibold">Priority</RadioGroupLabel>
    <div class="space-y-2 mt-1">
      <RadioGroupOption
        as="template"
        v-for="option in options"
        :key="option.value"
        :value="option"
        @click="onInput(option)"
        v-slot="{ checked }"
      >
        <div
          :class="[checked ? 'bg-primary-main text-primary-dark' : 'bg-white ']"
          class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-primary-dark' : 'text-gray-900'"
                  class="font-medium capitalize"
                >
                  {{ option.value }}
                </RadioGroupLabel>
              </div>
            </div>
            <div v-show="checked" class="shrink-0 text-blue-500">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#000" fill-opacity="0.2" />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, SetupContext } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { Option } from '@/types'

export default defineComponent({
  name: 'RadioGroupEl',
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption
  },
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<{ value: string }[]>,
      required: true
    }
  },
  setup(props, { emit }: SetupContext) {
    const selected = ref(props.options.find(({ value }) => value === props.value))

    const onInput = (option: Option) => {
      emit('on-select', option.value)
    }

    return { selected, onInput }
  }
})
</script>
