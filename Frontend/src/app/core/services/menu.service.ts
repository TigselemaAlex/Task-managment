import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  createMenu(): MenuItem[] {
    return [
      { icon: 'home', label: 'Inicio', url: '' },
      { icon: 'task', label: 'Tareas', url: '/tasks' },
      { icon: 'star', label: 'Importantes', url: '/important' },
      { icon: 'manage_accounts', label: 'Configuración', url: '/config' },
    ];
  }

  getMenuItem(url: string = ''): MenuItem {
    return this.createMenu().find((item) => item.url === url)!;
  }
}
