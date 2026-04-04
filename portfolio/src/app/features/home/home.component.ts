import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { TechStackComponent } from '../tech-stack/tech-stack.component';
import { ArchitectureComponent } from '../architecture/architecture.component';
import { BlogFeedComponent } from '../blog-feed/blog-feed.component';
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
    BlogFeedComponent,
    AdBannerComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero />
    <app-about />
    <app-tech-stack />
    <app-architecture />
    <app-blog-feed />
    <app-ad-banner slot="6125069611" placement="home-before-contact" />
    <app-contact />
  `,
})
export class HomeComponent {}
