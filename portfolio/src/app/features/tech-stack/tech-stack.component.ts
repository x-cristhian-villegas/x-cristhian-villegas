import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';

interface TechCategory {
  name: string;
  color: string;
  items: TechItem[];
}

interface TechItem {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  readonly categories: TechCategory[] = [
    {
      name: 'Languages & Frameworks',
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
      name: 'Cloud, DevOps & Infra',
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
      name: 'Databases',
      color: 'var(--accent-orange)',
      items: [
        { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres&theme=dark' },
        { name: 'Redis', icon: 'https://skillicons.dev/icons?i=redis&theme=dark' },
        { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb&theme=dark' },
      ],
    },
    {
      name: 'IDEs & Editors',
      color: 'var(--accent-yellow)',
      items: [
        { name: 'IntelliJ IDEA', icon: 'https://skillicons.dev/icons?i=idea&theme=dark' },
        { name: 'Eclipse', icon: 'https://skillicons.dev/icons?i=eclipse&theme=dark' },
        { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode&theme=dark' },
      ],
    },
    {
      name: 'Dev Tools',
      color: 'var(--accent-purple)',
      items: [
        { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman&theme=dark' },
        { name: 'Git', icon: 'https://skillicons.dev/icons?i=git&theme=dark' },
        { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
        { name: 'Gradle', icon: 'https://skillicons.dev/icons?i=gradle&theme=dark' },
      ],
    },
    {
      name: 'Operating Systems',
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
    return item.name;
  }

  trackByTech(_index: number, item: TechItem): string {
    return item.name;
  }
}
