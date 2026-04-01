import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly roles = [
    'Fullstack Developer',
    'Cloud Architect',
    'Backend Engineer',
  ];

  readonly techBadges = [
    { name: 'Java', x: 0, y: 15 },
    { name: 'Spring', x: 85, y: 5 },
    { name: 'Angular', x: 90, y: 65 },
    { name: 'AWS', x: 5, y: 78 },
    { name: 'K8s', x: 45, y: 92 },
  ];

  currentRole = signal(this.roles[0]);
  displayText = signal('');
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.type();
  }

  ngOnDestroy(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  scrollTo(selector: string): void {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  }

  private type(): void {
    const current = this.roles[this.roleIndex];

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
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.timeoutId = setTimeout(() => this.type(), 400);
        return;
      }
      this.timeoutId = setTimeout(() => this.type(), 40);
    }
  }
}
