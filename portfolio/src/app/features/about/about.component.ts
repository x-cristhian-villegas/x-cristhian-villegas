import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../shared/animations/scroll.animation';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface AboutItem {
  icon: string;
  labelKey: string;
  color: string;
  itemKeys: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly i18n = inject(I18nService);

  readonly aboutData: AboutItem[] = [
    {
      icon: '{}',
      labelKey: 'about.card.focus',
      color: 'var(--accent-green)',
      itemKeys: ['about.card.focus.1', 'about.card.focus.2', 'about.card.focus.3'],
    },
    {
      icon: '>_',
      labelKey: 'about.card.building',
      color: 'var(--accent-cyan)',
      itemKeys: ['about.card.building.1', 'about.card.building.2', 'about.card.building.3'],
    },
    {
      icon: 'AI',
      labelKey: 'about.card.ai',
      color: 'var(--accent-purple)',
      itemKeys: ['about.card.ai.1', 'about.card.ai.2', 'about.card.ai.3'],
    },
    {
      icon: '#',
      labelKey: 'about.card.env',
      color: 'var(--accent-keyword)',
      itemKeys: ['about.card.env.1', 'about.card.env.2', 'about.card.env.3'],
    },
  ];

  trackByLabel(_index: number, item: AboutItem): string {
    return item.labelKey;
  }

  trackByItem(index: number): number {
    return index;
  }
}
