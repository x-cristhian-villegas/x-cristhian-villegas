import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { AboutComponent } from './features/about/about.component';
import { TechStackComponent } from './features/tech-stack/tech-stack.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';
import { ContactComponent } from './features/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ArchitectureComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
