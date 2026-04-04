import { Injectable, signal, computed, effect } from '@angular/core';
import { en } from './lang/en';
import { es } from './lang/es';

export type Lang = 'en' | 'es';

const TRANSLATIONS: Record<Lang, Record<string, string>> = { en, es };
const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.getInitialLang());

  constructor() {
    effect(() => {
      const l = this.lang();
      document.documentElement.setAttribute('lang', l);
      localStorage.setItem(STORAGE_KEY, l);
    });
  }

  private readonly dict = computed(() => TRANSLATIONS[this.lang()]);

  t(key: string): string {
    return this.dict()[key] ?? key;
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'es' : 'en'));
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') {
      return stored;
    }
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'es' ? 'es' : 'en';
  }
}
