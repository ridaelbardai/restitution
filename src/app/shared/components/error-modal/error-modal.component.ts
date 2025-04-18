import { Component, Input, OnInit } from '@angular/core';
import { ErrorModalService } from 'src/app/core/services/error-modal.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  isVisible = false;
  title = 'Error';
  message = '';

  constructor(private errorModalService: ErrorModalService) {}

  ngOnInit(): void {
    this.errorModalService.modalState$.subscribe(state => {
      this.isVisible = state.isOpen;
      this.title = state.title || 'Error';
      this.message = state.message || '';
    });
  }

  closeModal(): void {
    this.errorModalService.closeModal();
  }
}
