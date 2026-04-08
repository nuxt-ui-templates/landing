<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('content').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})

const heroTitle = computed(() => {
  const [primary = '', ...secondaryParts] = (page.value?.title ?? '').split('\n')

  return {
    primary,
    secondary: secondaryParts.join(' ').trim()
  }
})

function heroMotion(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay }
  }
}

function scrollMotion(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    inViewOptions: { once: true, amount: 0.5 },
    transition: { duration: 0.6, delay }
  }
}

function cardMotion(index: number) {
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    inViewOptions: { once: true, amount: 0.2 },
    transition: { duration: 0.5, delay: index * 0.08 }
  }
}

const toast = useToast()

const copied = ref(false)

function copyCommand() {
  if (page.value?.cta?.command) {
    copied.value = true
    navigator.clipboard.writeText(page.value.cta.command)
    toast.add({ title: 'Copied to clipboard!', icon: 'i-lucide-circle-check' })
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div v-if="page">
    <!-- Hero -->
    <UPageHero
      :ui="{
        root: 'overflow-hidden pb-24 sm:pb-32',
        container: 'relative z-10 lg:py-32',
        wrapper: 'flex flex-col items-center',
        title: 'sm:text-6xl lg:text-7xl xl:text-[80px] tracking-tighter leading-[1.05]',
        description: 'mt-5 max-w-xl mx-auto text-base sm:text-lg leading-relaxed text-dimmed',
        links: 'gap-3'
      }"
    >
      <template #top>
        <GradientGlow class="top-0 w-[800px] h-[600px]" />
      </template>

      <template #headline>
        <Motion v-bind="heroMotion(0.2)">
          <div class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-3.5 py-1.5 text-xs font-medium text-muted">
            <span class="size-1.5 rounded-full bg-primary animate-pulse" />
            {{ page.hero.headline }}
          </div>
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="heroMotion(0.35)"
        >
          {{ heroTitle.primary }}
          <br v-if="heroTitle.secondary">
          <span
            v-if="heroTitle.secondary"
            class="bg-linear-to-br from-primary-400 via-primary-300 to-primary-200 bg-clip-text text-transparent"
          >
            {{ heroTitle.secondary }}
          </span>
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="heroMotion(0.5)"
        >
          {{ page.description }}
        </Motion>
      </template>

      <template #links>
        <Motion
          class="flex justify-center gap-6"
          v-bind="heroMotion(0.65)"
        >
          <UButton
            v-for="link in page.hero.links"
            :key="link.label"
            v-bind="link"
          />
        </Motion>
      </template>

      <div class="w-full max-w-2xl mx-auto">
        <Motion
          as-child
          v-bind="heroMotion(0.85)"
        >
          <HeroTerminal :lines="page.terminal.lines" />
        </Motion>

        <Motion
          class="flex flex-col items-center gap-6 mt-12"
          v-bind="heroMotion(1)"
        >
          <p class="font-mono font-medium text-xs text-dimmed/50 uppercase tracking-[0.12em] text-center">
            {{ page.logos.title }}
          </p>

          <div class="flex items-center gap-8">
            <UIcon
              v-for="(icon, index) in page.logos.icons"
              :key="index"
              :name="icon"
              class="size-6 shrink-0 text-dimmed/50 hover:text-primary transition-all duration-300 hover:scale-110"
            />
          </div>
        </Motion>
      </div>
    </UPageHero>

    <!-- Features -->
    <UPageSection
      id="features"
      :ui="{
        root: 'py-24 sm:py-32 scroll-mt-(--ui-header-height)',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed'
      }"
    >
      <template #headline>
        <Motion
          as="span"
          v-bind="scrollMotion()"
        >
          {{ page.features.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="scrollMotion(0.1)"
        >
          {{ page.features.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="scrollMotion(0.2)"
        >
          {{ page.features.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
          <Motion
            v-for="(feature, index) in page.features.items"
            :key="feature.title"
            v-bind="cardMotion(index)"
            as-child
          >
            <UPageCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
              class="rounded-none duration-300"
              to="#"
              :ui="{
                leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
                title: 'text-sm tracking-tight',
                description: 'text-sm leading-relaxed sm:line-clamp-2 lg:line-clamp-3 text-dimmed'
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <!-- Metrics -->
    <UPageSection
      id="metrics"
      :ui="{
        root: 'py-24 sm:py-32 scroll-mt-(--ui-header-height)',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em] text-center',
        title: 'max-w-lg mx-auto',
        description: 'max-w-md mx-auto text-dimmed'
      }"
    >
      <template #headline>
        <Motion
          as="span"
          v-bind="scrollMotion()"
        >
          {{ page.metrics.headline }}
        </Motion>
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="scrollMotion(0.1)"
        >
          {{ page.metrics.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="scrollMotion(0.2)"
        >
          {{ page.metrics.description }}
        </Motion>
      </template>

      <div class="rounded-2xl border border-default bg-default overflow-hidden">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
          <Motion
            v-for="(metric, index) in page.metrics.items"
            :key="metric.label"
            v-bind="cardMotion(index)"
            as-child
          >
            <UPageCard
              :title="metric.value"
              :description="metric.label"
              class="rounded-none duration-300"
              to="#"
              :ui="{
                root: 'text-center',
                wrapper: 'items-center',
                title: ['text-4xl font-bold tracking-tight leading-none', metric.class],
                description: 'font-mono text-xs uppercase tracking-[0.06em] text-dimmed mt-3'
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <!-- CTA -->
    <UPageCTA
      variant="naked"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-3xl text-center',
        title: 'lg:text-5xl tracking-tighter whitespace-pre-line',
        description: 'mx-auto max-w-sm leading-relaxed text-dimmed'
      }"
    >
      <template #top>
        <GradientGlow class="bottom-0 w-[600px] h-[400px]" />
      </template>

      <template #title>
        <Motion
          as="span"
          v-bind="scrollMotion()"
        >
          {{ page.cta.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          as="span"
          v-bind="scrollMotion(0.1)"
        >
          {{ page.cta.description }}
        </Motion>
      </template>

      <template #links>
        <Motion
          class="flex flex-col items-center justify-center gap-6"
          v-bind="scrollMotion(0.2)"
        >
          <UButton
            v-for="link in page.cta.links"
            :key="link.label"
            v-bind="link"
            size="xl"
          />

          <UButton
            :label="page.cta.command"
            :trailing-icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
            color="neutral"
            variant="subtle"
            class="font-mono gap-4"
            size="xl"
            :ui="{ trailingIcon: 'size-5' }"
            @click="copyCommand"
          />
        </Motion>
      </template>
    </UPageCTA>
  </div>
</template>
