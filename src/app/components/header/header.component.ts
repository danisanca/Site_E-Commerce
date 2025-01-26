import { Component,AfterViewInit  } from '@angular/core';
import {  RouterLink } from '@angular/router';
import Collapse from 'bootstrap/js/dist/collapse';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  
})

export class HeaderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const navLinks = document.querySelectorAll('.nav-link');
    const toogle = document.querySelectorAll('.navbar-toggler-icon');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
      console.log(link.innerHTML);
        if (navbarCollapse?.classList.contains('show')) {
          console.log('true');
          // Fecha o collapse
          const collapse = new Collapse(navbarCollapse as HTMLElement);
          collapse.hide();
        }
      });
    });
    toogle.forEach((link) => {
      link.addEventListener('click', () => {
      console.log(link.innerHTML);
        if (navbarCollapse?.classList.contains('show')) {
          console.log('true');
          // Fecha o collapse
          const collapse = new Collapse(navbarCollapse as HTMLElement);
          collapse.hide();
        }
      });
    });
  }
}
