import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeMenu: string = '';

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
  }
}
