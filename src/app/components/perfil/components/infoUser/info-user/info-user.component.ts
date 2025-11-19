import { Component, Input, OnInit } from '@angular/core';
import { ChangePassword, User, UserUpdate } from '../../../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createEmptyUser, getUserIdFromToken } from '../../../../../helpers/functionsHelpers';
import { UserService } from '../../../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-user',
  imports: [CommonModule,FormsModule],
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent implements OnInit{
user: User = createEmptyUser();
passwordForm:ChangePassword ={
  userId:0,
  currentPassword:'',
  newPassword:'',
  ConfirmNewPassword:''
}

constructor(private userService:UserService,private toastr: ToastrService) { }
ngOnInit(): void {
   let userIdOnToken = getUserIdFromToken();
      this.userService.getUserById(userIdOnToken!).subscribe(response => {
        this.user = response;
      });
}

updateUser() {
   var model:UserUpdate ={
    id: this.user.id,
    nomeCompleto: this.user.nomeCompleto,
    email: this.user.email,
  }
  this.userService.updateUser(model).subscribe({
    next: () => this.toastr.success('Usuario atualizado com sucesso!'),
    error: () => this.toastr.error('Erro ao atualizar o usuario.')
  });
}

changePassword(){
  
  if(this.passwordForm.newPassword !== '' &&
    this.passwordForm.ConfirmNewPassword !== '' &&
    this.passwordForm.currentPassword !== ''){
    if(this.passwordForm.newPassword !== this.passwordForm.ConfirmNewPassword){ 
        this.toastr.error('As senhas não coincidem!');
        this.passwordForm = {
          userId:0,
          currentPassword:this.passwordForm.currentPassword,
          newPassword:'',
          ConfirmNewPassword:''
        }
        return;
        
      }else{
        var model:ChangePassword = {
          userId:this.user.id!,
          currentPassword:this.passwordForm.currentPassword,
          newPassword:this.passwordForm.newPassword,
          ConfirmNewPassword:this.passwordForm.ConfirmNewPassword
        }
        this.userService.ChangePassword(model).subscribe({
          next: () => this.toastr.success('Senha atualizado com sucesso!'),
          error: () => this.toastr.error('Erro ao atualizar a senha.')
        });
        this.passwordForm = {
          userId:0,
          currentPassword:'',
          newPassword:'',
          ConfirmNewPassword:''
        }
      }
    }else{
      this.toastr.error('Preencha todos os campos!');
    }
  
}

}
