import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) {}

  showError(message: string) {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: message });
  }
}
