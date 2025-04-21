import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../interfaces/user';
import { AuthResponse } from '../../../../../interfaces/AuthResponse';
import { JwtPayload } from '../../../../../interfaces/JwtPayload';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '../../../../../services/user/user.service';
import * as jwt_decode from "jwt-decode";
import { Address } from '../../../../../interfaces/Address';
import {  ToastrService } from 'ngx-toastr';
import { createEmptyUser, getUserIdFromToken } from '../../../../../helpers/functionsHelpers';

@Component({
  selector: 'app-address',
  imports: [CommonModule,FontAwesomeModule,FormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit{
user: User = createEmptyUser();
storageUser!:any;

constructor(private userService:UserService,private toastr: ToastrService) { }

  ngOnInit(): void {
    let userIdOnToken = getUserIdFromToken();
    this.userService.getUserById(userIdOnToken!).subscribe(response => {
      this.user = response;
    });

  }

  updateUser() {
    console.log('Dados atualizados:', this.user.address);
    this.userService.updateUserAddress(this.user.address).subscribe({
      next: () => this.toastr.success('Endereço atualizado com sucesso!'),
      error: () => this.toastr.error('Erro ao atualizar o endereço.')
    });
  }

  
}
