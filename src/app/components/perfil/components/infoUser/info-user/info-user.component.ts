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
  idUser:0,
  CurrentPassword:'',
  NewPassword:'',
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
    name: this.user.name,
    email: this.user.email,
  }
  console.log('Dados atualizados:', model);
  this.userService.updateUser(model).subscribe({
    next: () => this.toastr.success('Usuario atualizado com sucesso!'),
    error: () => this.toastr.error('Erro ao atualizar o usuario.')
  });
}

changePassword(){
  
  if(this.passwordForm.NewPassword !== '' &&
    this.passwordForm.ConfirmNewPassword !== '' &&
    this.passwordForm.CurrentPassword !== ''){
    if(this.passwordForm.NewPassword !== this.passwordForm.ConfirmNewPassword){ 
        this.toastr.error('As senhas não coincidem!');
        this.passwordForm = {
          idUser:0,
          CurrentPassword:this.passwordForm.CurrentPassword,
          NewPassword:'',
          ConfirmNewPassword:''
        }
        console.log('As senhas não coincidem!1');
        return;
        
      }else{
        console.log('As senhas não coincidem!2');
        var model:ChangePassword = {
          idUser:this.user.id!,
          CurrentPassword:this.passwordForm.CurrentPassword,
          NewPassword:this.passwordForm.NewPassword,
          ConfirmNewPassword:this.passwordForm.ConfirmNewPassword
        }
        this.userService.ChangePassword(model).subscribe({
          next: () => this.toastr.success('Senha atualizado com sucesso!'),
          error: () => this.toastr.error('Erro ao atualizar a senha.')
        });
        this.passwordForm = {
          idUser:0,
          CurrentPassword:'',
          NewPassword:'',
          ConfirmNewPassword:''
        }
      }
    }else{
      this.toastr.error('Preencha todos os campos!');
    }
  
}

}
