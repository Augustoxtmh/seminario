import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  activeMenu: string = '';

  toggleCollapse(menu: string) {
    if (this.activeMenu === menu) {
      this.activeMenu = '';
    } else {
      this.activeMenu = menu;
    }
  }
}
