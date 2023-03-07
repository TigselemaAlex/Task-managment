import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SidenavComponent, UserInfoComponent],
  exports: [SidenavComponent, UserInfoComponent],
})
export class CoreModule {}
