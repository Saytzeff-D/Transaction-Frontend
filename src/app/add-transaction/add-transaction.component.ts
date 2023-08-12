import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { RequestsService } from '../services/requests.service';
import { MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  public transactionForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required)
  })
  public disableBtn = false

  constructor(public request: RequestsService, public dialogRef: MatDialogRef<AddTransactionComponent>) { }

  ngOnInit(): void {
      
  }

  addTransaction(){    
    if (this.transactionForm.valid) {
      this.disableBtn = true
      this.request.addTransaction(this.transactionForm.value).subscribe((res:any)=>{
        console.log(res)
        this.disableBtn = false
        this.dialogRef.close(res.message)
      }, err=>{
        this.disableBtn = false
        console.log(err)
        this.dialogRef.close('Internal Server Error')
      })
    }else console.log('Invalid Form')
  }

}
