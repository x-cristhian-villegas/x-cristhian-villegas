import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface TechItem {
  name: string;
  icon: string;
}

interface TechCategory {
  nameKey: string;
  color: string;
  items: TechItem[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [ScrollRevealDirective, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  readonly i18n = inject(I18nService);

  readonly categories: TechCategory[] = [
    {
      nameKey: 'stack.cat.languages',
      color: 'var(--accent-keyword)',
      items: [
        { name: 'Java', icon: 'https://skillicons.dev/icons?i=java&theme=dark' },
        { name: 'Spring Boot', icon: 'https://skillicons.dev/icons?i=spring&theme=dark' },
        { name: 'Python', icon: 'https://skillicons.dev/icons?i=python&theme=dark' },
        { name: 'Angular', icon: 'https://skillicons.dev/icons?i=angular&theme=dark' },
        { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts&theme=dark' },
        { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap&theme=dark' },
        { name: 'Tailwind', icon: 'https://skillicons.dev/icons?i=tailwind&theme=dark' },
        { name: 'PrimeNG', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/primeng/primeng-original.svg' },
      ],
    },
    {
      nameKey: 'stack.cat.cloud',
      color: 'var(--accent-cyan)',
      items: [
        { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws&theme=dark' },
        { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker&theme=dark' },
        { name: 'Kubernetes', icon: 'https://skillicons.dev/icons?i=kubernetes&theme=dark' },
        { name: 'Terraform', icon: 'https://skillicons.dev/icons?i=terraform&theme=dark' },
        { name: 'GitHub Actions', icon: 'https://skillicons.dev/icons?i=githubactions&theme=dark' },
        { name: 'Grafana', icon: 'https://skillicons.dev/icons?i=grafana&theme=dark' },
      ],
    },
    {
      nameKey: 'stack.cat.databases',
      color: 'var(--accent-orange)',
      items: [
        { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres&theme=dark' },
        { name: 'Redis', icon: 'https://skillicons.dev/icons?i=redis&theme=dark' },
        { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb&theme=dark' },
      ],
    },
    {
      nameKey: 'stack.cat.ides',
      color: 'var(--accent-yellow)',
      items: [
        { name: 'IntelliJ IDEA', icon: 'https://skillicons.dev/icons?i=idea&theme=dark' },
        { name: 'Eclipse', icon: 'https://skillicons.dev/icons?i=eclipse&theme=dark' },
        { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode&theme=dark' },
      ],
    },
    {
      nameKey: 'stack.cat.tools',
      color: 'var(--accent-purple)',
      items: [
        { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman&theme=dark' },
        { name: 'Git', icon: 'https://skillicons.dev/icons?i=git&theme=dark' },
        { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
        { name: 'Gradle', icon: 'https://skillicons.dev/icons?i=gradle&theme=dark' },
      ],
    },
    {
      nameKey: 'stack.cat.os',
      color: 'var(--accent-light-blue)',
      items: [
        { name: 'Ubuntu', icon: 'https://skillicons.dev/icons?i=ubuntu&theme=dark' },
        { name: 'Debian', icon: 'https://skillicons.dev/icons?i=debian&theme=dark' },
        { name: 'Fedora', icon: 'https://skillicons.dev/icons?i=fedora&theme=dark' },
        { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux&theme=dark' },
      ],
    },
  ];

  trackByName(_index: number, item: TechCategory): string {
    return item.nameKey;
  }

  trackByTech(_index: number, item: TechItem): string {
    return item.name;
  }
}
