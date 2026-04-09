import { defineCollection, z } from '@nuxt/content'

const createEnum = (options: [string, ...string[]]) => z.enum(options)

const createLinkSchema = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional().editor({ input: 'icon' }),
  trailingIcon: z.string().optional().editor({ input: 'icon' }),
  size: createEnum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  trailing: z.boolean().optional(),
  target: createEnum(['_blank', '_self']).optional(),
  color: createEnum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']).optional(),
  variant: createEnum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
})

export const collections = {
  content: defineCollection({
    source: 'index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object({
        headline: z.string().optional(),
        links: z.array(createLinkSchema())
      }),
      terminal: z.object({
        lines: z.array(z.object({
          segments: z.array(z.object({
            text: z.string(),
            style: z.string()
          }))
        }))
      }),
      logos: z.object({
        title: z.string().nonempty(),
        items: z.array(z.string())
      }),
      features: z.object({
        headline: z.string().optional(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        items: z.array(z.object({
          icon: z.string(),
          title: z.string().nonempty(),
          description: z.string().nonempty()
        }))
      }),
      metrics: z.object({
        headline: z.string().optional(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        items: z.array(z.object({
          value: z.string().nonempty(),
          label: z.string().nonempty(),
          class: z.string().nonempty()
        }))
      }),
      cta: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        command: z.string().nonempty(),
        links: z.array(createLinkSchema())
      })
    })
  })
}
