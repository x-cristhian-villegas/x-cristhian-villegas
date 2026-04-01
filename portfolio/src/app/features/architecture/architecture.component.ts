import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';

interface ArchLayer {
  name: string;
  color: string;
  icon: string;
  items: string[];
}

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
})
export class ArchitectureComponent {
  readonly layers: ArchLayer[] = [
    {
      name: 'Frontend',
      color: 'var(--accent-keyword)',
      icon: '{}',
      items: ['Angular', 'TypeScript', 'Bootstrap', 'Tailwind CSS', 'PrimeNG'],
    },
    {
      name: 'Backend',
      color: 'var(--accent-green)',
      icon: '>_',
      items: ['Spring Boot', 'REST / gRPC', 'Java'],
    },
    {
      name: 'Data',
      color: 'var(--accent-orange)',
      icon: 'db',
      items: ['PostgreSQL', 'Redis', 'MongoDB'],
    },
    {
      name: 'Infrastructure',
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
    return item.name;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
