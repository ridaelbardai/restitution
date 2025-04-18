// src/app/core/services/menu-toggle.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuToggleService {
  private toggleMenuSubject = new Subject<void>();

  toggleMenu$ = this.toggleMenuSubject.asObservable();

  emitToggle() {
    this.toggleMenuSubject.next();
  }
}
