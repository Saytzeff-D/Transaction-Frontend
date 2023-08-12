import { Component } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoading = true
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  })

  constructor(public request: RequestsService) {}

  login(){
    if (this.loginForm.valid) {
      this.isLoading = true
      this.request.login(this.loginForm.value).subscribe((res=>{}), (err=>{}))
    } else {
      console.log('Invalid')
    }
  }
}
