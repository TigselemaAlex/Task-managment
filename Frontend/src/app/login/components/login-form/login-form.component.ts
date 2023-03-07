import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JWTResponse } from 'src/app/shared/models/jwtresponse.model';
import { UserLogin } from '../../models/user-login.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() registerForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this._formBuilder.nonNullable.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  public onShowPassword(event: Event): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

  public onRegisterForm(): void {
    this.registerForm.emit(true);
  }

  public signin(): void {
    const userLogin: UserLogin = this.form.getRawValue();
    this._userService.signin(userLogin).subscribe({
      next: (resp) => {
        const jwtResponse: JWTResponse = resp.data as JWTResponse;
        localStorage.setItem('jwt', JSON.stringify(jwtResponse));
        this._router.navigate(['/home']);
      },
      error: (err) => {
        this._matSnackBar.open(err.error.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'error-snackbar',
        });
      },
    });
  }
}
