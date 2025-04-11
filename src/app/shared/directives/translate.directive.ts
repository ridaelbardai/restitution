import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appTranslate]',
  standalone: true
})
export class TranslateDirective implements OnInit, OnDestroy {
  @Input('appTranslate') key: string = '';
  private subscription: Subscription | null = null;

  constructor(
    private el: ElementRef,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.subscription = this.translationService.translations$.subscribe(translations => {
      this.el.nativeElement.textContent = translations[this.key] || this.key;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}