<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()

const items = computed(() => [
  {
    label: 'Features',
    to: '#features',
    active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('metrics')
  },
  {
    label: 'Performance',
    to: '#metrics',
    active: activeHeadings.value.includes('metrics')
  }
])

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#metrics')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="h-6 w-auto shrink-0" />
      </NuxtLink>

      <TemplateMenu />
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UButton
        label="Sign in"
        color="neutral"
        variant="ghost"
        class="hidden lg:flex"
      />
      <UButton
        label="Get started"
        color="neutral"
        class="hidden lg:flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
      />

      <div class="mt-4 flex flex-col gap-2">
        <UButton
          label="Sign in"
          color="neutral"
          variant="soft"
          block
        />
        <UButton
          label="Get started"
          block
        />
      </div>
    </template>
  </UHeader>
</template>
