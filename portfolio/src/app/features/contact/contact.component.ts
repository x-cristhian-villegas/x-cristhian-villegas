import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';

interface SocialLink {
  name: string;
  url: string;
  color: string;
  icon: string;
  hint: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly socialLinks: SocialLink[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/x-cristhian-villegas/',
      color: '#0A66C2',
      icon: 'in',
      hint: 'Let\'s connect',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/x-cristhian-villegas',
      color: '#e8e8e8',
      icon: '</>',
      hint: 'See my code',
    },
    {
      name: 'X / Twitter',
      url: 'https://x.com/ChrisVillegas92',
      color: '#f0f0f0',
      icon: 'X',
      hint: 'Follow me',
    },
    {
      name: 'Email',
      url: 'mailto:x.cristhian.villegas@gmail.com',
      color: '#EA4335',
      icon: '@',
      hint: 'x.cristhian.villegas@gmail.com',
    },
  ];

  trackByName(_index: number, item: SocialLink): string {
    return item.name;
  }
}
