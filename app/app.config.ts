export default defineAppConfig({
  ui: {
    colors: {
      primary: 'lime',
      warning: 'purple',
      neutral: 'zinc'
    },
    button: {
      slots: {
        base: 'font-semibold'
      },
      variants: {
        size: {
          xs: {
            base: 'px-3'
          },
          sm: {
            base: 'px-4'
          },
          md: {
            base: 'px-4'
          },
          lg: {
            base: 'px-5'
          },
          xl: {
            base: 'px-6'
          }
        }
      }
    }
  }
})
