import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HistoryService } from 'src/app/modules/user/services/history.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
    `],
  providers: [MessageService, ConfirmationService]
})
export class ReportComponent implements OnInit, OnDestroy {

  progress = false;
  history: any[] = [];
  private subscription: Subscription[] = [];

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.subscription.push(
      this.historyService.getReport().subscribe((res) => {
        this.history = res.history;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  export(): void {}

}
