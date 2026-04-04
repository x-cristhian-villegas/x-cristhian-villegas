import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy, inject, effect, untracked } from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);

  private readonly roleKeys = [
    'hero.role.fullstack',
    'hero.role.cloud',
    'hero.role.backend',
  ];

  readonly techBadges = [
    { name: 'Java', x: 0, y: 15 },
    { name: 'Spring', x: 85, y: 5 },
    { name: 'Angular', x: 90, y: 65 },
    { name: 'AWS', x: 5, y: 78 },
    { name: 'K8s', x: 45, y: 92 },
  ];

  displayText = signal('');
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private initialized = false;

  constructor() {
    effect(() => {
      this.i18n.lang();
      if (this.initialized) {
        untracked(() => this.restart());
      }
    });
  }

  ngOnInit(): void {
    this.initialized = true;
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  scrollTo(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }

  private restart(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.roleIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.displayText.set('');
    this.type();
  }

  private type(): void {
    const current = this.i18n.t(this.roleKeys[this.roleIndex]);

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayText.set(current.substring(0, this.charIndex));

      if (this.charIndex === current.length) {
        this.timeoutId = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }
      this.timeoutId = setTimeout(() => this.type(), 80);
    } else {
      this.charIndex--;
      this.displayText.set(current.substring(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roleKeys.length;
        this.timeoutId = setTimeout(() => this.type(), 400);
        return;
      }
      this.timeoutId = setTimeout(() => this.type(), 40);
    }
  }
}
