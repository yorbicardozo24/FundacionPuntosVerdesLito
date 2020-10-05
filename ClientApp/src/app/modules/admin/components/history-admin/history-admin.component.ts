import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { FoundationsService } from '../../services/foundations.service';

@Component({
  selector: 'app-history-admin',
  templateUrl: './history-admin.component.html',
  styleUrls: ['./history-admin.component.css'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
    `],
  providers: [MessageService, ConfirmationService]
})
export class HistoryAdminComponent implements OnInit, OnDestroy {

  progress = false;
  history: any[] = [];
  private subscription: Subscription[] = [];

  constructor(private foundationsService: FoundationsService) { }

  ngOnInit(): void {
    this.subscription.push(
      this.foundationsService.historyadmin().subscribe((res) => {
        this.history = res.history;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe);
  }

  export(): any {
    console.log('export');
  }

}
