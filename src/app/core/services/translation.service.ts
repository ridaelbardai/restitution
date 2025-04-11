// src/app/services/translation.service.ts
import { Injectable, signal, computed, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Use a BehaviorSubject to trigger updates
  private translationsSubject = new BehaviorSubject<Record<string, string>>({});
  translations$ = this.translationsSubject.asObservable();
  
  // Keep track of current locale
  private currentLocaleSubject = new BehaviorSubject<string>('en');
  currentLocale$ = this.currentLocaleSubject.asObservable();

  constructor(private http: HttpClient) {
    // Load default translations
    this.loadTranslations('en');
  }

  loadTranslations(locale: string): void {
    this.http.get<Record<string, string>>(`/assets/i18n/${locale}.json`)
      .subscribe({
        next: (data) => {
          console.log(`Loaded translations for ${locale}:`, data);
          this.translationsSubject.next(data);
          this.currentLocaleSubject.next(locale);
        },
        error: (err) => {
          console.error(`Failed to load translations for ${locale}:`, err);
        }
      });
  }

  translate(key: string): Observable<string> {
    return new Observable<string>(observer => {
      const subscription = this.translations$.subscribe(translations => {
        observer.next(translations[key] || key);
      });
      
      return () => subscription.unsubscribe();
    });
  }
}