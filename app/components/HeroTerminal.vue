<script setup lang="ts">
import { Motion } from 'motion-v'

interface TerminalSegment {
  text: string
  style: string
}

interface TerminalLine {
  segments: TerminalSegment[]
}

const { lines } = defineProps<{
  lines: TerminalLine[]
}>()

const segmentStyles: Record<string, string> = {
  'prompt': 'text-muted',
  'cmd': 'text-highlighted',
  'flag': 'text-primary',
  'dim': 'text-muted',
  'success': 'text-success',
  'url': 'text-info',
  'metric-good': 'text-primary'
}

function lineMotion(index: number) {
  return {
    initial: { opacity: 0, x: -4 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay: 1.4 + index * 0.4 }
  }
}
</script>

<template>
  <Motion
    as="div"
    class="mx-auto w-full max-w-[720px] px-4 sm:px-6"
    :initial="{ opacity: 0, y: 16 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 1, delay: 0.85 }"
  >
    <div class="overflow-hidden rounded-xl border border-default bg-elevated/50 shadow-2xl shadow-black/50 ring-1 ring-white/2">
      <div class="flex items-center gap-1.5 border-b border-default p-4 sm:px-6">
        <span class="size-2.5 rounded-full border border-default bg-muted" />
        <span class="size-2.5 rounded-full border border-default bg-muted" />
        <span class="size-2.5 rounded-full border border-default bg-muted" />
      </div>

      <div class="min-h-[200px] p-5 font-mono text-[13px] leading-[1.8] sm:p-6">
        <Motion
          v-for="(line, lineIndex) in lines"
          :key="lineIndex"
          as="div"
          v-bind="lineMotion(lineIndex)"
        >
          <span
            v-for="(segment, segIndex) in line.segments"
            :key="segIndex"
            :class="segmentStyles[segment.style]"
          >
            {{ segment.text }}
          </span>
        </Motion>
      </div>
    </div>
  </Motion>
</template>
