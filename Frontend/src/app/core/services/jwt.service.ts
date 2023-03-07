import { Injectable } from '@angular/core';
import { JWTResponse } from 'src/app/shared/models/jwtresponse.model';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  public getJwt(): JWTResponse {
    return JSON.parse(localStorage.getItem('jwt')!) as JWTResponse;
  }
}
