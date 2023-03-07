import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { HomeComponent } from './pages/home/home.component';
import { ImportantComponent } from './pages/important/important.component';
import { ConfigComponent } from './pages/config/config.component';

@NgModule({
  declarations: [PageMainComponent, TasksComponent, HomeComponent, ImportantComponent, ConfigComponent],
  imports: [CommonModule, HomeRoutingModule, CoreModule, SharedModule],
})
export class HomeModule {}
