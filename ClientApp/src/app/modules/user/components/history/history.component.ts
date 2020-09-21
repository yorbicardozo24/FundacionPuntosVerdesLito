import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HistoryComponent implements OnInit, OnDestroy {

  history: any[] = [];
  private subscription: Subscription[] = [];
  userId = JSON.parse(localStorage.getItem('user')).userId;

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.subscription.push(
      this.historyService.getHistory(this.userId).subscribe((res) => {
        if (res) {
          this.history = res.history;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

}
