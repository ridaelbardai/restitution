import { trigger, transition, style, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* => login', [
        style({ opacity: 0, transform: 'scale(0.8) translateY(-100%)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' })
        ),
      ]),
      transition('* => home', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class MainLayoutComponent implements OnInit {
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  

  
  constructor(private authService: AuthService) {}
  prepareRoute(outlet: RouterOutlet) {
    const animation = outlet?.activatedRouteData?.['animation'];
    return animation;
  }

  ngOnInit(): void {
    //to track if user is logged in
    this.authSub = this.authService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }
}
