import { Component,AfterViewInit, Input, OnInit  } from '@angular/core';
import {  RouterLink } from '@angular/router';
import Collapse from 'bootstrap/js/dist/collapse';
import { CartItem } from '../../interfaces/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  
})

export class HeaderComponent implements OnInit,AfterViewInit {
  @Input() sizeCart!:number;
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarSupportedContent') as HTMLElement;
    const togglerOpen = document.getElementById('navbar-toggler-open') as HTMLElement;
    const togglerClose = document.getElementById('navbar-toggler-close') as HTMLElement
    const collapseInstance = new Collapse(navbarCollapse, { toggle: false });
    navLinks.forEach((link) => {
      console.log(link);
      link.addEventListener('click', () => {
        if (navbarCollapse?.classList.contains('show')) {
          console.log('true');
          // Fecha o collapse
          const collapse = new Collapse(navbarCollapse as HTMLElement);
          console.log(collapse);
          collapse.hide();
          togglerOpen.style.display = 'block';
          togglerClose.style.display = 'none';
        }
      });
    });
      togglerOpen?.addEventListener('click', () => {
        // O menu será aberto, então mostramos o botão de fechar
        togglerClose.style.display = 'block';
        togglerOpen.style.display = 'none';
      });
      
      togglerClose?.addEventListener('click', () => {
        // O menu será fechado, então mostramos o botão de abrir
        togglerOpen.style.display = 'block';
        togglerClose.style.display = 'none';
        
        // Fecha o menu de forma programática
        collapseInstance.hide();
      });
   
  }
}
