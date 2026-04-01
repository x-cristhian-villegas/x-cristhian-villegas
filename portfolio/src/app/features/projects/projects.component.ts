import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';

interface Project {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  icon: string;
  color: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly PAGE_SIZE = 5;

  readonly query = signal('');
  readonly page = signal(1);

  readonly projects: Project[] = [
    {
      name: 'REST Client AGVB',
      tagline: 'Collaborative API testing in the browser',
      description:
        'Free API testing platform for developers. Supports all HTTP methods with JSON syntax highlighting, environment variables, request history, collections, workspace collaboration, and Google OAuth authentication.',
      tags: ['Angular', 'Node.js', 'Google OAuth', 'REST API', 'Docker'],
      liveUrl: 'https://rest.iamcristhian.dev',
      repoUrl: 'https://github.com/x-cristhian-villegas/rest-client-agvb-web',
      icon: '>>',
      color: 'var(--accent-cyan)',
      featured: true,
    },
    {
      name: 'Creaciones Angie',
      tagline: 'Artisan e-commerce with online quotation system',
      description:
        'Landing page for a Mexican artisanal business specializing in handmade candles, resin art, and creative stationery. Features an integrated quotation system, contact form, and responsive design.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap Icons'],
      liveUrl: 'https://creaciones-angy.com',
      icon: 'CA',
      color: 'var(--accent-orange)',
      featured: false,
    },
  ];

  readonly filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    if (!q) return this.projects;

    return this.projects
      .map((p) => ({ project: p, score: this.score(p, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.project);
  });

  readonly totalPages = computed(() => Math.ceil(this.filtered().length / this.PAGE_SIZE) || 1);

  readonly paged = computed(() => {
    const start = (this.page() - 1) * this.PAGE_SIZE;
    return this.filtered().slice(start, start + this.PAGE_SIZE);
  });

  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly hasResults = computed(() => this.filtered().length > 0);

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }

  clearSearch(): void {
    this.query.set('');
    this.page.set(1);
  }

  goToPage(p: number): void {
    this.page.set(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackByName(_index: number, item: Project): string {
    return item.name;
  }

  private score(project: Project, query: string): number {
    const terms = query.split(/\s+/);
    let total = 0;

    for (const term of terms) {
      let termScore = 0;
      const nameLower = project.name.toLowerCase();
      const taglineLower = project.tagline.toLowerCase();
      const descLower = project.description.toLowerCase();
      const tagsJoined = project.tags.join(' ').toLowerCase();

      if (nameLower.includes(term)) termScore += 10;
      if (tagsJoined.includes(term)) termScore += 8;
      if (taglineLower.includes(term)) termScore += 5;
      if (descLower.includes(term)) termScore += 3;

      if (termScore === 0) return 0; // all terms must match
      total += termScore;
    }

    return total;
  }
}
