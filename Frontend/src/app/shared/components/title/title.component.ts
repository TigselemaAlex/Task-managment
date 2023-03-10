import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menu-item.model';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  public menuItem: MenuItem = { icon: '', label: '', url: '' };

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUrl(this.router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getCurrentUrl(event);
      }
    });
  }
  private getCurrentUrl(router: NavigationEnd | Router): void {
    const currentUrl = router.url.replace('/home', '');
    this.menuItem = this.menuService.getMenuItem(currentUrl);
  }
}
