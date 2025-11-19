import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule,Validators  } from '@angular/forms';
import { OrderService } from '../../../services/order/order.service';
import { OrderToPayment, OrderHeader } from '../../../interfaces/order';
import { createEmptyUser, getUserIdFromToken, validateCpfCnpj } from '../../../helpers/functionsHelpers';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../../interfaces/cartItem';
import { AuthService } from '../../../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule,ReactiveFormsModule ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{

  orderUser: OrderHeader = {} as OrderHeader;
  userId:string = "";
  orderId:string = "";
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
    private auth:AuthService,
    private route: ActivatedRoute,
    private router: Router,
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

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe(async params => {
          const idOrder = params.get('id')!.toString();
          if (idOrder === undefined || idOrder === "") {
            this.router.navigate(['/'])
          }
          else{
            this.userId = getUserIdFromToken()!;
            var isLoged = this.auth.isAuthenticated();
            this.orderId = idOrder;
            if(isLoged == true){
              this.orderUser = await this.getOrderPayment(idOrder);
              this.calcResume();
              this.userService.getUserById(this.userId).subscribe(response => {
                this.user = response;
                this.address = `${this.user.address.street} - ${this.user.address.neighborhood},  ${this.user.address.city} - ${this.user.address.state}`;
                this.postalCode = `${this.user.address.zipcode}`;
              });
            }
          }
    });
    
  }
  async getOrderPayment(headerId: string): Promise<OrderHeader>{
    const response = await firstValueFrom(this.orderService.GetByOrderToPayment(headerId));
    return response;
  }
  
  calcResume():void{
    let newValue:number = 0.0;
  this.orderUser.orderDetailsDto.forEach(item => {
      let value = (item.price-(item.price*(item.discount/100)))*item.count
      newValue += value;
    });
    this.finalPrice = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(newValue);
  } 
  getPayment(typePayment:string):number{
    switch(typePayment){
      case "Pix": return 0;
      case "Boleto": return 1;
      case "CreditCard": return 2;
      case "MercadoPago": return 3;
      default: return 3;
    }
  }
  onSubmit():void {
    var validDocument = validateCpfCnpj(this.orderForm.value.documentNumber);
    if(validDocument === 'INVALID'){
      this.toastr.error('Número de documento inválido. Verifique e tente novamente.');
      return;
    }
        const order: OrderToPayment = {
          name: this.user.nomeCompleto, 
          email: this.user.email, 
          typePayment: this.getPayment(this.orderForm.value.typePayment),
          address: this.address,
          typeDocument: validDocument,
          documentNumber: this.orderForm.value.documentNumber,
          postalCode: this.postalCode,
          totalPrice: this.totalPrice,
          orderHeaderId: this.orderUser.id,
          itens:this.orderUser.orderDetailsDto
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
        console.log('Formulário inválido. Verifique os campos obrigatórios.');
      }
      
    }
   
    else{
      console.log('Selecione um método de pagamento válido');
    }
   
  }

  async getOrder(): Promise<OrderHeader>{
    const response = await firstValueFrom(this.orderService.GetByOrderToPayment(this.orderId));
    return response;
  }
 
}
