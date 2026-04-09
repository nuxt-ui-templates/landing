<script setup lang="ts">
const links = [
  { label: 'Docs', to: 'https://ui.nuxt.com', target: '_blank' },
  { label: 'GitHub', to: 'https://github.com/nuxt/ui', target: '_blank' },
  { label: 'Twitter', to: 'https://twitter.com/nuxt_js', target: '_blank' },
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
