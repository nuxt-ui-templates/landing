export default defineAppConfig({
  ui: {
    colors: {
      primary: 'lime',
      warning: 'purple',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'font-semibold transition-all duration-200'
      },
      compoundVariants: [{
        color: 'primary' as const,
        variant: 'solid' as const,
        class: 'hover:bg-primary active:bg-primary shadow-[0_0_20px_var(--btn-glow)] hover:shadow-[0_0_30px_var(--btn-glow-hover)] hover:-translate-y-px active:translate-y-0 [--btn-glow:color-mix(in_oklch,var(--ui-primary)_25%,transparent)] [--btn-glow-hover:color-mix(in_oklch,var(--ui-primary)_35%,transparent)]'
      }, {
        size: 'xs' as const,
        square: false,
        class: { base: 'px-3' }
      }, {
        size: ['sm', 'md'] as const,
        square: false,
        class: { base: 'px-4' }
      }, {
        size: 'lg' as const,
        square: false,
        class: { base: 'px-5' }
      }, {
        size: 'xl' as const,
        square: false,
        class: { base: 'px-6' }
      }]
    }
  }
})
