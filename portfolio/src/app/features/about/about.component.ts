import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';

interface AboutItem {
  icon: string;
  label: string;
  color: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly aboutData: AboutItem[] = [
    {
      icon: '{}',
      label: 'Focus',
      color: 'var(--accent-green)',
      items: [
        'Distributed systems & microservices',
        'Cloud-native applications (AWS)',
        'Clean Architecture & DDD',
      ],
    },
    {
      icon: '>_',
      label: 'Currently Building',
      color: 'var(--accent-cyan)',
      items: [
        'Production-grade APIs with Spring Boot',
        'Responsive UIs with Angular',
        'Container orchestration with K8s',
      ],
    },
    {
      icon: 'AI',
      label: 'AI-Powered Workflow',
      color: 'var(--accent-purple)',
      items: [
        'Claude Code for AI-assisted dev',
        'GitHub Copilot for completions',
        'Gemini for research & ideation',
      ],
    },
    {
      icon: '#',
      label: 'Dev Environment',
      color: 'var(--accent-keyword)',
      items: [
        'IntelliJ IDEA (Java/Spring)',
        'VS Code (Angular/TypeScript)',
        'Ubuntu/Fedora workstations',
      ],
    },
  ];

  trackByLabel(_index: number, item: AboutItem): string {
    return item.label;
  }

  trackByItem(index: number): number {
    return index;
  }
}
