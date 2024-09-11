import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  user_role: any;
  enabledarkmood: boolean = true;
  switchTheme = new FormControl(false);
  @HostBinding('class') className = '';
  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  constructor(private _router: Router, private overlay: OverlayContainer) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngDoCheck(): void {
    this.switchTheme.valueChanges.subscribe((currentMood) => {
      this.className = currentMood ? 'theme-dark' : 'theme-light';
      if (currentMood) {
        this.overlay.getContainerElement().classList.add(this.darkClass);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClass);
      }
    });
    this.user_role = sessionStorage.getItem('role');
    const user_session_id = sessionStorage.getItem('user_session_id');
    if (user_session_id) {
      this.loggedIn = true;
    }
  }

  logout() {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user_session_id');
    this._router.navigateByUrl('/sign-in');
    location.reload();
  }
  setMood() {
    var element = document.body;
    this.enabledarkmood = !this.enabledarkmood;
    element.dataset['bsTheme'] =
      element.dataset['bsTheme'] == 'light' ? 'dark' : 'light';
  }
}
