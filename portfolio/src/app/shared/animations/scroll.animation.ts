import { Directive, ElementRef, inject, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer!: IntersectionObserver;

  ngOnInit(): void {
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(24px)';
    this.el.nativeElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('style',
              'opacity: 1; transform: translateY(0); transition: opacity 0.6s ease-out, transform 0.6s ease-out;'
            );
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
