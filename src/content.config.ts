import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const brands = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brands' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    role: z.string(), // güç zincirindeki halka: motor / aktarma / kontrol...
    roleNo: z.string(), // "01" gibi mono etiket numarası
    tagline: z.string(),
    description: z.string(),
    productGroups: z.array(z.string()),
    specs: z.array(z.object({ k: z.string(), v: z.string() })),
    website: z.string().url().optional(),
    accent: z.string().optional(), // marka vurgu rengi (kart detayında)
  }),
});

export const collections = { brands };
