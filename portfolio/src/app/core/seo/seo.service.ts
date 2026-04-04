import { Injectable, inject, effect, untracked } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';

const ROUTE_META: Record<string, { titleKey: string; descKey: string }> = {
  '/': { titleKey: 'page.home.title', descKey: 'page.home.description' },
  '/projects': { titleKey: 'page.projects.title', descKey: 'page.projects.description' },
};

const SITE_URL = 'https://iamcristhian.dev';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private i18n = inject(I18nService);
  private currentPath = '/';

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentPath = e.urlAfterRedirects || '/';
        this.update();
      });

    effect(() => {
      this.i18n.lang();
      untracked(() => this.update());
    });
  }

  private update(): void {
    const routeMeta = ROUTE_META[this.currentPath] ?? ROUTE_META['/'];

    this.title.setTitle(this.i18n.t(routeMeta.titleKey));
    this.meta.updateTag({ name: 'description', content: this.i18n.t(routeMeta.descKey) });

    const lang = this.i18n.lang();
    const altLang = lang === 'en' ? 'es' : 'en';
    const url = SITE_URL + this.currentPath;

    this.meta.updateTag({ property: 'og:locale', content: lang === 'en' ? 'en_US' : 'es_MX' });
    this.meta.updateTag({ property: 'og:title', content: this.i18n.t(routeMeta.titleKey) });
    this.meta.updateTag({ property: 'og:description', content: this.i18n.t(routeMeta.descKey) });
    this.meta.updateTag({ property: 'og:url', content: url });

    this.setHreflang(lang, altLang, url);
  }

  private setHreflang(lang: string, altLang: string, url: string): void {
    this.upsertLink('alternate-' + lang, 'alternate', lang, url);
    this.upsertLink('alternate-' + altLang, 'alternate', altLang, url);
    this.upsertLink('alternate-x-default', 'alternate', 'x-default', url);
  }

  private upsertLink(id: string, rel: string, hreflang: string, href: string): void {
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.id = id;
      link.rel = rel;
      document.head.appendChild(link);
    }
    link.hreflang = hreflang;
    link.href = href;
  }
}
