import { en } from "./dictionaries/en";
import { it } from "./dictionaries/it";
import type { Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, it };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
