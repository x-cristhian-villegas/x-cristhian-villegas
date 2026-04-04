import { Component, ChangeDetectionStrategy, inject, signal, OnInit, computed } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface BlogPost {
  title: string;
  link: string;
  description: string;
  category: string;
  pubDate: string;
  lang: 'en' | 'es';
}

const FEED_URL = 'https://blog.iamcristhian.dev/feed.xml';
const BLOG_URL = 'https://blog.iamcristhian.dev';
const MAX_POSTS = 4;

const ES_SLUGS = [
  '-guia-', '-desarrollo-', '-produccion-', '-estandar-', '-tendencias-',
  '-autenticacion-', '-evolucion-', '-protocolo-', '-mas-alla-',
  '-mejores-', '-como-', '-teoria-', '-filtracion-', '-regulacion-',
  '-despidos-', '-ronda-', '-crisis-', '-cluster-', '-prohibe-',
  '-computacion-', '-orden-', '-ataque-', '-instalar-',
];

@Component({
  selector: 'app-blog-feed',
  standalone: true,
  imports: [ScrollRevealDirective, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './blog-feed.component.html',
  styleUrl: './blog-feed.component.scss',
})
export class BlogFeedComponent implements OnInit {
  readonly i18n = inject(I18nService);
  readonly allPosts = signal<BlogPost[]>([]);
  readonly loading = signal(true);

  readonly posts = computed(() => {
    const lang = this.i18n.lang();
    return this.allPosts()
      .filter((p) => p.lang === lang)
      .slice(0, MAX_POSTS);
  });

  ngOnInit(): void {
    this.fetchFeed();
  }

  trackByLink(_index: number, post: BlogPost): string {
    return post.link;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(this.i18n.lang() === 'es' ? 'es-MX' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  private async fetchFeed(): Promise<void> {
    try {
      const res = await fetch(FEED_URL);
      const xml = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      const items = doc.querySelectorAll('item');
      const posts: BlogPost[] = [];

      items.forEach((item) => {
        const title = item.querySelector('title')?.textContent ?? '';
        const link = item.querySelector('link')?.textContent ?? '';
        const descRaw = item.querySelector('description')?.textContent ?? '';
        const category = item.querySelector('category')?.textContent ?? '';
        const pubDate = item.querySelector('pubDate')?.textContent ?? '';
        const slug = link.toLowerCase();
        const lang = ES_SLUGS.some((s) => slug.includes(s)) ? 'es' : 'en';
        const description = descRaw.replace(/<[^>]*>/g, '').substring(0, 120) + '...';

        posts.push({ title, link, description, category, pubDate, lang });
      });

      this.allPosts.set(posts);
    } catch {
      // Silently fail — section just won't show posts
    } finally {
      this.loading.set(false);
    }
  }

  readonly blogUrl = BLOG_URL;
}
