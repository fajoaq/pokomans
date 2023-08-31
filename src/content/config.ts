import { z, defineCollection } from "astro:content";
import { PMOVES } from "../lib/pmoves";

const pokoman = defineCollection({
  schema: z.object({
    id: z.number().max(9999),
    title: z
      .string()
      .max(
        60,
        "For maximized SEO, please provide a title of 60 characters max."
      ),
    intro: z
      .string()
      .max(
        160,
        "For maximized SEO, please provide a title of 160 characters max."
      ),
    date: z.date(),
    creator: z.enum(["Francis Joaquin"]),
    hp: z.number().max(999),
    attack: z.number().max(999),
    defance: z.number().max(999),
    ageeleetee: z.number().max(999),
    moveset: z.array(z.enum(PMOVES)).max(4),
    draft: z.boolean(),
    imgSrc: z.string(),
    repo: z.string(),
  }),
});

const pmove = defineCollection({
  schema: z.object({
    id: z.number().max(9999),
    title: z.enum(PMOVES),
    description: z
      .string()
      .max(
        160,
        "For maximized SEO, please provide a title of 160 characters max."
      ),
    type: z
      .string()
      .max(
        60,
        "For maximized SEO, please provide a title of 60 characters max."
      ),
    attack: z.number().max(999),
    speed: z.number().max(999),
    repo: z.string(),
    imgSrc: z.string(),
  }),
});

export const collections = { pokoman, pmove };
