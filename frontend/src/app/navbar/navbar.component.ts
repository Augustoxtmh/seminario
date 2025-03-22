import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeMenu: string = '';
  der: Usuario = JSON.parse(localStorage.getItem("User") || '{}');

  constructor(private router: Router){
  }

  toggleCollapse(menu: string) {
    if (this.activeMenu === menu) {
      this.activeMenu = '';
    } else {
      this.activeMenu = menu;
    }
  }

  goToUrl(url: string)
  {
    this.router.navigate([url]);
  }

  cerrarSesion(){
    this.router.navigate([''])
    localStorage.removeItem('User')
  }
}
