// src/app/pipes/translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false // Important for reactive updates
  })
  export class TranslatePipe implements PipeTransform {
    constructor(private translationService: TranslationService) {}
  
    transform(key: string): string {
      let result = key;
      this.translationService.translations$.subscribe(translations => {
        result = translations[key] || key;
      });
      return result;
    }
  }
  