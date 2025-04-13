import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private authSub!: Subscription;

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Retrieve language and direction from localStorage or default to French (fr)
    const savedLang = localStorage.getItem('language') || 'fr';
    const savedDir = localStorage.getItem('dir') || 'ltr';

    // Use the saved language and listen for language changes
    this.translate.use(savedLang).subscribe(() => {
      // Set the direction attribute after language change is complete
      this.setDirection(savedDir);
    });

    //to track if user is logged in
    this.authSub = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  // Function to switch language and update direction
  switchLanguage(language: string): void {
    // Determine direction based on language
    const direction = language === 'ar' ? 'rtl' : 'ltr';

    // Save the language and direction to localStorage
    localStorage.setItem('language', language);
    localStorage.setItem('dir', direction);

    // Change the language
    this.translate.use(language).subscribe(() => {
      // After language change is complete, set the direction attribute
      this.setDirection(direction);
    });
    // Reload the current page
    location.reload();
  }

  // Helper function to set the HTML dir attribute
  setDirection(direction: string): void {
    document.documentElement.setAttribute('dir', direction);
  }

  // Get the opposite language for language switch
  get oppositeLang(): string {
    return this.translate.currentLang === 'fr' ? 'ar' : 'fr';
  }

  // Get the button text for switching language
  get buttonText(): string {
    return this.translate.instant(
      this.translate.currentLang === 'fr'
        ? 'header.switch_to_arabic'
        : 'header.switch_to_french'
    );
  }
}
