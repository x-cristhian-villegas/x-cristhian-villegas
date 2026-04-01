import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { TechStackComponent } from '../tech-stack/tech-stack.component';
import { ArchitectureComponent } from '../architecture/architecture.component';
import { ContactComponent } from '../contact/contact.component';
import { AdBannerComponent } from '../../shared/ad-banner/ad-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ArchitectureComponent,
    AdBannerComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-tech-stack />
    <app-architecture />
    <app-ad-banner slot="1234567890" placement="home-before-contact" />
    <app-contact />
  `,
})
export class HomeComponent {}
