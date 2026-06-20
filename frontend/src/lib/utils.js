import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateSlug = (text) => slugify(text || "", { lower: true, strict: true })


