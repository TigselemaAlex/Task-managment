import { Component, Input, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { UserService } from 'src/app/login/services/user.service';
import { User } from 'src/app/login/models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() expanded: boolean = false;

  public defaultImage: string = './assets/img/default-user.jpg';
  public user: User = {
    name: '',
    email: '',
    password: '',
    lastName: '',
    phone: '',
  };

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    let id = this.jwtService.getJwt()?.userID;
    this.userService.findById(id).subscribe({
      next: (resp) => {
        let user: User = resp.data as User;
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
