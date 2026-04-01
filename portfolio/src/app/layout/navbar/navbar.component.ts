import { Component, signal, inject, HostListener, ChangeDetectionStrategy, computed } from '@angular/core';
import { ThemeService } from '../../core/theme/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private themeService = inject(ThemeService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  themeIcon = computed(() => this.themeService.theme() === 'vscode' ? 'IJ' : 'VS');
  themeLabel = computed(() => this.themeService.theme() === 'vscode' ? 'Switch to Darcula' : 'Switch to VSCode Dark');

  readonly navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  scrollTo(href: string): void {
    this.closeMenu();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
}
