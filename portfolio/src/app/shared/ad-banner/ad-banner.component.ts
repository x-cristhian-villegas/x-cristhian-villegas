import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let adsbygoogle: any[];
declare let gtag: (...args: any[]) => void;

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-banner" #adContainer>
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-6537012191136290"
        [attr.data-ad-slot]="slot"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  `,
  styles: [`
    .ad-banner {
      max-width: 728px;
      margin: 3rem auto;
      min-height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
})
export class AdBannerComponent implements AfterViewInit {
  @Input() slot = '';
  @Input() placement = 'unknown';
  @ViewChild('adContainer') adContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      (adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not available
    }

    setTimeout(() => this.trackAdStatus(), 3000);
  }

  private trackAdStatus(): void {
    const container = this.adContainer?.nativeElement;
    if (!container) return;

    const ins = container.querySelector('ins.adsbygoogle');
    const rendered =
      ins !== null &&
      ins.getAttribute('data-ad-status') === 'filled';

    const eventName = rendered ? 'ad_rendered' : 'ad_blocked';

    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        ad_placement: this.placement,
      });
    }
  }
}
