import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MercadoPagoResponse } from '../../../../../interfaces/PaymentResponse';
import { CartService } from '../../../../../services/cart/cart.service';

@Component({
  selector: 'app-finish-payment',
  imports: [RouterLink, CommonModule],
  templateUrl: './finish-payment.component.html',
  styleUrl: './finish-payment.component.css'
})
export class FinishPaymentComponent implements OnInit {
  paymentResponse:MercadoPagoResponse =  {} as MercadoPagoResponse;

  constructor(private route: ActivatedRoute, private cartService:CartService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paymentResponse.collection_id = params['collection_id'];
      this.paymentResponse.collection_status = params['collection_status'];
      this.paymentResponse.payment_id = params['payment_id'];
      this.paymentResponse.status = params['status'];
      this.paymentResponse.external_reference = params['external_reference'];
      this.paymentResponse.payment_type = params['payment_type'];
      this.paymentResponse.merchamt_order_id = params['merchant_order_id'];
      this.paymentResponse.preference_id = params['preference_id'];
      this.paymentResponse.site_id = params['site_id'];
      this.paymentResponse.processing_mode = params['processing_mode'];
      this.paymentResponse.merchant_account_id = params['merchant_account_id'];

      this.cartService.clearCart();
    });
  }
}
