import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../interfaces/cartItem';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule,Validators  } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { Order } from '../../../interfaces/order';
import { createEmptyUser, getUserIdFromToken, validateCpfCnpj } from '../../../helpers/functionsHelpers';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';


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
   totalPrice:number = 0.0;
   user: User = createEmptyUser();
   //Payment
   selectedPayment: string = 'MercadoPago';
   address: string = '';
   postalCode: string = '';
   orderForm: FormGroup;

  constructor(private cartService:CartService,
    private fb: FormBuilder, 
    private orderService: OrderService,
    private userService:UserService,
    private toastr: ToastrService)
    {
    this.orderForm = this.fb.group({
      typePayment: ['MercadoPago', Validators.required], 
      documentNumber: [''],
      address: [''],
      postalCode: [''],
    });
    this.orderForm.get('typePayment')?.valueChanges.subscribe(value => {
      this.selectedPayment = value;
    
    });
  }

  ngOnInit(): void {
    let userIdOnToken = getUserIdFromToken();
    this.cartService.cart$.subscribe(items => {
      this.cartList = items;
      this.calcResume();
    });
    this.userService.getUserById(userIdOnToken!).subscribe(response => {
      this.user = response;
      this.address = `${this.user.address.street} - ${this.user.address.neighborhood},  ${this.user.address.city} - ${this.user.address.state}`;
      this.postalCode = `${this.user.address.zipcode}`;
    });
  }
  
  
  calcResume():void{
    let newValue:number = 0.0;
    this.cartList.forEach(item => {
      newValue += (item.finalPrice*item.quantity);
    });
    this.totalPrice = newValue;
    this.finalPrice = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(newValue);
  }
  
  onSubmit():void {
    var validDocument = validateCpfCnpj(this.orderForm.value.documentNumber);
    if(validDocument === 'INVALID'){
      this.toastr.error('Número de documento inválido. Verifique e tente novamente.');
      return;
    }
    let userIdOnToken = getUserIdFromToken();
        const order: Order = {
          userId: userIdOnToken!, 
          cartList: this.cartList, 
          finalPrice: this.totalPrice,
          typePayment: this.orderForm.value.typePayment,
          address: this.address,
          typeDocument: validDocument,
          documentNumber: this.orderForm.value.documentNumber,
          postalCode: this.postalCode,
          date: new Date()
        };
    if(this.selectedPayment === 'MercadoPago'){
      if (this.orderForm.valid) {
        
        this.orderService.paymentMercadoPago(order).subscribe({
          next: (checkoutUrl: string) => {
            this.toastr.success(`Você será redirecionado para o Mercado Pago`);
            setTimeout(() => {
              window.location.href = checkoutUrl;
            }, 2000);
            
          },
          error: (err) => {
            this.toastr.error(`Erro ao criar ordem: ${err}`);
          }
        });
        
      }else{
        console.log(`${this.orderForm.value.typePayment}-${this.orderForm.value.documentNumber}-${this.address}-${this.postalCode}`);
        console.log('Formulário inválido. Verifique os campos obrigatórios.');
      }
      
    }
   
    else{
      console.log('Selecione um método de pagamento válido');
    }
   
  }
 
}
