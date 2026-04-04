import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';
import { AdBannerComponent } from '../../shared/ad-banner/ad-banner.component';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface Project {
  name: string;
  taglineKey: string;
  descKey: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  icon: string;
  color: string;
  featured: boolean;
  statusKey?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, AdBannerComponent, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private readonly PAGE_SIZE = 5;
  readonly i18n = inject(I18nService);

  readonly query = signal('');
  readonly page = signal(1);

  readonly projects: Project[] = [
    {
      name: 'REST Client AGVB',
      taglineKey: 'projects.rest.tagline',
      descKey: 'projects.rest.desc',
      tags: ['Angular', 'Node.js', 'Google OAuth', 'REST API', 'Docker'],
      liveUrl: 'https://rest.iamcristhian.dev',
      repoUrl: 'https://github.com/x-cristhian-villegas/rest-client-agvb-web',
      icon: '>>',
      color: 'var(--accent-cyan)',
      featured: true,
      statusKey: 'projects.rest.status',
    },
    {
      name: 'Creaciones Angie',
      taglineKey: 'projects.angie.tagline',
      descKey: 'projects.angie.desc',
      tags: ['Spring Boot', 'Thymeleaf', 'Spring Security', 'Bootstrap Icons'],
      liveUrl: 'https://creaciones-angy.com',
      icon: 'CA',
      color: 'var(--accent-orange)',
      featured: true,
      statusKey: 'projects.angie.status',
    },
    {
      name: 'BPM Engine AGVB',
      taglineKey: 'projects.bpm.tagline',
      descKey: 'projects.bpm.desc',
      tags: ['Spring Boot', 'Angular', 'PostgreSQL', 'Docker'],
      liveUrl: 'https://bpm.iamcristhian.dev/dashboard',
      icon: 'BP',
      color: 'var(--accent-cyan)',
      featured: true,
      statusKey: 'projects.bpm.status',
    },
    {
      name: 'Blog AGVB',
      taglineKey: 'projects.blog.tagline',
      descKey: 'projects.blog.desc',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
      liveUrl: 'https://blog.iamcristhian.dev',
      repoUrl: 'https://github.com/x-cristhian-villegas/cms-agvb',
      icon: 'BL',
      color: 'var(--accent-orange)',
      featured: true,
      statusKey: 'projects.blog.status',
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
      const taglineLower = this.i18n.t(project.taglineKey).toLowerCase();
      const descLower = this.i18n.t(project.descKey).toLowerCase();
      const tagsJoined = project.tags.join(' ').toLowerCase();

      if (nameLower.includes(term)) termScore += 10;
      if (tagsJoined.includes(term)) termScore += 8;
      if (taglineLower.includes(term)) termScore += 5;
      if (descLower.includes(term)) termScore += 3;

      if (termScore === 0) return 0;
      total += termScore;
    }

    return total;
  }
}
