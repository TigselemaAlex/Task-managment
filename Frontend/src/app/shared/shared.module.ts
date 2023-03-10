/* MODULES */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

/* COMPONENTS */
import { TitleComponent } from './components/title/title.component';

@NgModule({
  declarations: [TitleComponent],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    MatInputModule,
    MatDividerModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    TitleComponent,
  ],
})
export class SharedModule {}
