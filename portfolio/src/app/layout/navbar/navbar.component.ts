import { Component, signal, inject, HostListener, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../core/theme/theme.service';

interface NavLink {
  label: string;
  href?: string;
  route?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  themeIcon = computed(() => this.themeService.theme() === 'vscode' ? 'IJ' : 'VS');
  themeLabel = computed(() => this.themeService.theme() === 'vscode' ? 'Switch to Darcula' : 'Switch to VSCode Dark');

  readonly navLinks: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Projects', route: '/projects' },
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
