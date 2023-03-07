/* MODULES */
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

/* COMPONENTS */
import { PageMainComponent } from './pages/page-main/page-main.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [PageMainComponent, LoginFormComponent, RegisterFormComponent],
  imports: [SharedModule, LoginRoutingModule],
})
export class LoginModule {}
