import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '../../../../../interfaces/PurchaseOrder';
import { HistorypurchaseService } from '../../../../../services/historypurchase/historypurchase.service';
import { ToastrService } from 'ngx-toastr';
import { getUserIdFromToken } from '../../../../../helpers/functionsHelpers';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-purchase',
  imports: [CommonModule],
  templateUrl: './history-purchase.component.html',
  styleUrl: './history-purchase.component.css'
})
export class HistoryPurchaseComponent implements OnInit {
listPurchase: PurchaseOrder[] = [];

constructor(private historypurchaseService:HistorypurchaseService,private toastr: ToastrService) { }

  ngOnInit(): void {
    let userIdOnToken = getUserIdFromToken();
    this.historypurchaseService.getHistoryPurchaseById(userIdOnToken!).subscribe(response => {
      this.listPurchase = response;
      console.log(this.listPurchase);
    });
    
  }


}
