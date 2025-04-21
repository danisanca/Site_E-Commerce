import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  titulo: string = '';
showDropdown: boolean = false;

@ViewChild('dropdownMenu') dropdownMenu!: ElementRef;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.atualizarTitulo(this.router.url);
      }
    });
  }

  atualizarTitulo(url: string) {
    if (url.includes('infoUser')) {
      this.titulo = 'Informações Pessoais';
    }else if (url.includes('address')) {
      this.titulo = 'Endereço';
    }
    else if (url.includes('historyPurchase')) {
      this.titulo = 'Histórico de Compra';
    }
    else {
      this.titulo = 'Minha Conta';
    }
  }
  toogleDropDown(event: Event):void{
      event.stopPropagation();
      if(this.showDropdown){
        this.showDropdown = false;
      }else{
        this.showDropdown = true;
      }
  }
    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      if (this.showDropdown && this.dropdownMenu && !this.dropdownMenu.nativeElement.contains(event.target)) {
        this.showDropdown = false;
      }
    }
}
