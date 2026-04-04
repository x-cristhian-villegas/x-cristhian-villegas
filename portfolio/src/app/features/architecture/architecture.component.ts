import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface ArchLayer {
  nameKey: string;
  color: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [ScrollRevealDirective, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  readonly i18n = inject(I18nService);

  readonly layers: ArchLayer[] = [
    {
      nameKey: 'arch.layer.frontend',
      color: 'var(--accent-keyword)',
      icon: '{}',
      items: ['Angular', 'TypeScript', 'Bootstrap', 'Tailwind CSS', 'PrimeNG'],
    },
    {
      nameKey: 'arch.layer.backend',
      color: 'var(--accent-green)',
      icon: '>_',
      items: ['Spring Boot', 'REST / gRPC', 'Java'],
    },
    {
      nameKey: 'arch.layer.data',
      color: 'var(--accent-orange)',
      icon: 'db',
      items: ['PostgreSQL', 'Redis', 'MongoDB'],
    },
    {
      nameKey: 'arch.layer.infra',
      color: 'var(--accent-cyan)',
      icon: '##',
      items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions'],
    },
  ];

  readonly principles: string[] = [
    'Clean Architecture',
    'SOLID',
    'Domain-Driven Design',
    'TDD',
    'CI/CD',
    'Microservices',
    'OWASP Top 10',
  ];

  trackByName(_index: number, item: ArchLayer): string {
    return item.nameKey;
  }

  trackByIndex(index: number): number {
    return index;
  }

  scrollTo(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }
}
