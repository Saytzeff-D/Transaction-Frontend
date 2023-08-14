import { Component } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isLoading = false
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  })
  public error = ''

  constructor(public request: RequestsService, public snackbar: MatSnackBar, public router: Router) {}

  login(){
    if (this.loginForm.valid) {
      this.isLoading = true
      this.request.login(this.loginForm.value).subscribe((res=>{
        this.isLoading = false
        this.router.navigate(['/admin/dashboard'])
      }), (err=>{
        console.log(err)
        this.isLoading = false
        err.statusText == 'Unknown Error' ? this.error = 'Check your internet connection' : this.error = err.error.message
        this.snackbar.open(this.error, 'Close', { duration: 5000 })
      }))
    } else {
      console.log('Invalid')
    }
  }
}
