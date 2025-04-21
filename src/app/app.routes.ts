import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { PaymentComponent } from './components/payment/payment/payment.component';
import { AuthGuard } from '../../auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { PerfilComponent } from './components/perfil/perfil/perfil.component';
import { AddressComponent } from './components/perfil/components/address/address/address.component';
import { HistoryPurchaseComponent } from './components/perfil/components/historyPurchase/history-purchase/history-purchase.component';
import { InfoUserComponent } from './components/perfil/components/infoUser/info-user/info-user.component';
import { FinishPaymentComponent } from './components/payment/components/finishPayment/finish-payment/finish-payment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent,
    children:[
      {path: 'address', component: AddressComponent},
      {path: 'historyPurchase', component: HistoryPurchaseComponent},
      {path: 'infoUser', component: InfoUserComponent},
      { path: '', redirectTo: 'infoUser', pathMatch: 'full' }
    ] 
  },
  { path: 'payment', component: PaymentComponent,canActivate: [AuthGuard] },
  { path: 'finishPayment', component: FinishPaymentComponent,canActivate: [AuthGuard] }
];
