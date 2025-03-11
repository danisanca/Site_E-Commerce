import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../interfaces/cartItem';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule,Validators  } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  cartList!:CartItem[];
   //Calculo Resumo
   finalPrice:string = "";
   selectedPayment: string = '';
   address: string = 'Av. Brasil Bloco:21 Apt:1 - JD.Alvorada';
   postalCode: string = '13555-757';
   userId:number = 1;
   orderForm: FormGroup;
  constructor(private cartService:CartService,
    private fb: FormBuilder, 
    private orderService: OrderService)
    {
    this.orderForm = this.fb.group({
      typePayment: ['', Validators.required], // Opção padrão
      nickName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      cardExpiration: ['', Validators.required],
      cardCVC: ['', Validators.required],
      documentNumenber: ['', Validators.required],
      address: [''],
      postalCode: [''],
    });
    this.orderForm.get('typePayment')?.valueChanges.subscribe(value => {
      this.selectedPayment = value;
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartList = items;
      this.calcResume();
    });
  }
  
  
  calcResume():void{
    let newValue:number = 0.0;
    this.cartList.forEach(item => {
      newValue += (item.finalPrice*item.quantity);
    });
    this.finalPrice = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(newValue);
  }
  
  onSubmit():void {
    if (this.orderForm.valid) {
      const order: Order = {
        userId: this.userId, // Pegue isso do usuário autenticado
        cartList: this.cartList, // Substituir com os itens do carrinho
        typePayment: this.orderForm.value.typePayment,
        address: this.address,
        postalCode: this.postalCode,
        date: new Date()
      };

      if (order.typePayment === 'CartaoDeCredito') {
        order['cardDetails'] = {
          nickName: this.orderForm.value.nickName,
          cardNumber: this.orderForm.value.cardNumber,
          cardHolder: this.orderForm.value.cardHolder,
          cardExpiration: this.orderForm.value.cardExpiration,
          cardCVC: this.orderForm.value.cardCVC,
          documentNumenber: this.orderForm.value.documentNumenber,
        };
      }

      this.orderService.createOrder(order);
    }
   
  }
}
