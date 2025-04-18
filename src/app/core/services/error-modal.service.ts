import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalState {
  isOpen: boolean;
  title?: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorModalService {
  private initialState: ModalState = {
    isOpen: false,
    title: '',
    message: ''
  };

  private modalStateSubject = new BehaviorSubject<ModalState>(this.initialState);
  modalState$ = this.modalStateSubject.asObservable();

  showModal(message: string, title = 'Error'): void {
    this.modalStateSubject.next({
      isOpen: true,
      title,
      message
    });
  }

  closeModal(): void {
    this.modalStateSubject.next({
      ...this.modalStateSubject.value,
      isOpen: false
    });
  }
}