<script setup lang="ts">
const links = [
  { label: 'Docs', to: '#' },
  { label: 'GitHub', to: '#' },
  { label: 'Twitter', to: '#' },
  { label: 'Status', to: '#' },
  { label: 'Privacy', to: '#' }
]
</script>

<template>
  <UFooter :ui="{ container: 'border-t border-default lg:py-8', right: 'gap-x-0' }">
    <template #left>
      <p class="text-sm text-dimmed">
        Built with Nuxt UI • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        v-for="link in links"
        :key="link.label"
        :label="link.label"
        :to="link.to"
        color="neutral"
        variant="link"
        class="font-light"
        size="sm"
      />
    </template>
  </UFooter>
</template>
