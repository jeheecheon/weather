export enum Locale {
  Ko = "ko",
  En = "en",
}

export const locales = Object.values(Locale);
export const defaultLocale = Locale.Ko;

export function isLocale(value: string): value is Locale {
  switch (value) {
    case Locale.Ko:
    case Locale.En:
      return true;
    default:
      return false;
  }
}
