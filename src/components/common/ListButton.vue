<template>
  <button class="w-10 h-10 rounded-md leading-5 active:opacity-40" @click="$emit('on-click')">
    <slot />
  </button>
</template>
