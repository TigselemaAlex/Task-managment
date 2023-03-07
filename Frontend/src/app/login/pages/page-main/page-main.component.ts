import { Component } from '@angular/core';

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
})
export class PageMainComponent {
  showRegisterForm = false;

  onShowRegisterForm(show: boolean) {
    this.showRegisterForm = show;
  }
}
