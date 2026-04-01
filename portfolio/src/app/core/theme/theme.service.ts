import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'vscode' | 'intellij';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('portfolio-theme', t);
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'vscode' ? 'intellij' : 'vscode'));
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored === 'vscode' || stored === 'intellij') {
      return stored;
    }
    return 'vscode';
  }
}
