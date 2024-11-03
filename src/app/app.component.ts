import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { SigninComponent } from './customer/signin/signin.component';
import { every, scheduled } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NgxScrollTopModule,
    SigninComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  screenHeight!: number;
  screenWidth!: number;
  footerMaxHeight!: number;
  constructor() {
    this.getScreenSize(event);
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxHeight = this.screenHeight - 160;
  }
  active() {
    window.scroll(0, 0);
  }
  title = 'e-commerce';
}
