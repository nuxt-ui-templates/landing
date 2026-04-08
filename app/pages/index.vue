<script setup lang="ts">
import { Motion } from 'motion-v'

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
    'initial': { opacity: 0, y: 16 },
    'while-in-view': { opacity: 1, y: 0 },
    'viewport': { once: true, amount: 0.5 },
    'transition': { duration: 0.6, delay }
  }
}

const toast = useToast()

function copyCommand() {
  if (page.value?.cta?.command) {
    navigator.clipboard.writeText(page.value.cta.command)
    toast.add({ title: 'Copied!', description: 'Command copied to clipboard.' })
  }
}
</script>

<template>
  <div v-if="page">
    <!-- Hero -->
    <UPageHero
      :ui="{
        root: 'overflow-hidden',
        container: 'relative z-10',
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
        <Motion
          as="div"
          v-bind="heroMotion(0.2)"
        >
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
            class="bg-linear-to-br from-primary-500 via-primary-300 to-primary-200 bg-clip-text text-transparent"
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
          as="div"
          class="flex justify-center gap-3"
          v-bind="heroMotion(0.65)"
        >
          <UButton
            v-for="link in page.hero.links"
            :key="link.label"
            v-bind="link"
          />
        </Motion>
      </template>

      <template #bottom>
        <HeroTerminal :lines="page.terminal.lines" />
      </template>
    </UPageHero>

    <!-- Features -->
    <UPageSection
      id="features"
      :ui="{
        root: 'py-24 sm:py-32',
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

      <div class="rounded-2xl border border-default bg-default">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Motion
            v-for="(feature, index) in page.features.items"
            :key="feature.title"
            as="div"
            v-bind="scrollMotion()"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="{ duration: 0.5, delay: index * 0.08 }"
          >
            <UPageCard
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
              variant="naked"
              class="border-default p-8 sm:p-9 transition-colors duration-300 hover:bg-elevated/50 rounded-none cursor-default"
              :class="[
                index < page.features.items.length - 3 ? 'border-b' : '',
                (index + 1) % 3 !== 0 ? 'lg:border-r' : ''
              ]"
              :ui="{
                leading: 'mb-5 flex size-9 justify-center rounded-lg bg-primary/10',
                title: 'text-sm tracking-tight',
                description: 'text-sm leading-relaxed line-clamp-3 text-dimmed'
              }"
            />
          </Motion>
        </div>
      </div>
    </UPageSection>

    <!-- Metrics -->
    <UPageSection
      id="metrics"
      orientation="horizontal"
      :ui="{
        root: 'py-24 sm:py-32',
        container: 'max-w-5xl',
        headline: 'font-mono font-medium text-xs text-primary uppercase tracking-[0.12em]',
        description: 'max-w-md text-sm leading-relaxed text-dimmed'
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

      <Motion
        as="div"
        class="overflow-hidden rounded-2xl border border-default bg-default"
        v-bind="scrollMotion(0.15)"
        :viewport="{ once: true, amount: 0.2 }"
      >
        <div class="grid grid-cols-2">
          <UPageCard
            v-for="(metric, index) in page.metrics.items"
            :key="metric.label"
            :title="metric.value"
            :description="metric.label"
            variant="naked"
            class="p-8 text-center transition-colors duration-300 hover:bg-elevated/50 rounded-none cursor-default"
            :class="[
              index < 2 ? 'border-b border-default' : '',
              index % 2 === 0 ? 'border-r border-default' : ''
            ]"
            :ui="{
              wrapper: 'items-center',
              title: `text-4xl font-bold tracking-tight leading-none ${metric.class}`,
              description: 'font-mono text-xs uppercase tracking-[0.06em] text-dimmed'
            }"
          />
        </div>
      </Motion>
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
          as="div"
          class="flex flex-col gap-3"
          v-bind="scrollMotion(0.2)"
        >
          <UButton
            v-for="link in page.cta.links"
            :key="link.label"
            v-bind="link"
            size="lg"
            block
          />
          <UButton
            :label="page.cta.command"
            icon="i-lucide-copy"
            color="neutral"
            variant="outline"
            class="font-mono"
            size="lg"
            block
            @click="copyCommand"
          />
        </Motion>
      </template>
    </UPageCTA>
  </div>
</template>
