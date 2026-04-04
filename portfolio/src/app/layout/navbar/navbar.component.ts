import { Component, signal, inject, HostListener, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface NavLink {
  labelKey: string;
  href?: string;
  route?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  themeIcon = computed(() => this.themeService.theme() === 'vscode' ? 'IJ' : 'VS');
  themeLabel = computed(() => this.themeService.theme() === 'vscode'
    ? this.i18n.t('nav.theme.darcula')
    : this.i18n.t('nav.theme.vscode'));
  langLabel = computed(() => this.i18n.lang() === 'en' ? 'ES' : 'EN');

  readonly navLinks: NavLink[] = [
    { labelKey: 'nav.about', href: '#about' },
    { labelKey: 'nav.stack', href: '#tech-stack' },
    { labelKey: 'nav.architecture', href: '#architecture' },
    { labelKey: 'nav.projects', route: '/projects' },
    { labelKey: 'nav.contact', href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleLang(): void {
    this.i18n.toggle();
  }

  toggleMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  navigate(link: NavLink): void {
    this.closeMenu();
    if (link.route) {
      this.router.navigateByUrl(link.route);
    } else if (link.href) {
      if (this.router.url !== '/') {
        this.router.navigateByUrl('/').then(() => {
          setTimeout(() => document.querySelector(link.href!)?.scrollIntoView({ behavior: 'smooth' }), 100);
        });
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  goHome(): void {
    this.closeMenu();
    if (this.router.url !== '/') {
      this.router.navigateByUrl('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
