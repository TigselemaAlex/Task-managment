import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ImportantComponent } from './pages/important/important.component';
import { ConfigComponent } from './pages/config/config.component';

const routes: Routes = [
  {
    path: '',
    component: PageMainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'important',
        component: ImportantComponent,
      },
      {
        path: 'config',
        component: ConfigComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
