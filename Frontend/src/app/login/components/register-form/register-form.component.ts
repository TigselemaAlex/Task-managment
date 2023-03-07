import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() registerForm: EventEmitter<boolean> = new EventEmitter<boolean>();
  showPassword = false;

  alidate = false;
  message!: string;

  form!: FormGroup;
  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ]),
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
      },
      {
        validators: this.validatePassword(),
      }
    );
  }

  public onShowPassword(event: Event): void {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }
  public onRegisterForm(): void {
    this.registerForm.emit(false);
  }

  public register(): void {
    const { email, password, name, lastName, phone } = this.form.getRawValue();
    const user: User = {
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      phone: phone,
    };
    this._userService.save(user).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.onRegisterForm();
      },
      error: (err) => {
        this._snackBar.open(err.error.message, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  public validatePassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null =>
      control.get('password')?.value === control.get('confirmPassword')?.value
        ? null
        : { notMatch: true };
  }
}
