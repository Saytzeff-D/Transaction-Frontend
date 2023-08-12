import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { MatSnackBar } from '@angular/material/snack-bar'
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public transactions = []
  public transfers = []
  public withdrawal = []
  public others = []
  public isLoading = true
  public error = ''
  public lineChartData = [
    {
      data: [],    
      barThickness: 17,
      borderRadius: 5,
    }  
  ]
  public chartLabels = [    
    'Transfer',
    'Withdrawals',
    'Others'
  ]
  public chartOptions = {
    responsive: true 
  }
  constructor(public dialog: MatDialog, public snackbar: MatSnackBar, public request: RequestsService) { }

  ngOnInit(): void {
      this.request.history().subscribe((res:any)=>{
        this.isLoading = false
        this.transactions = res.transactions
        console.log(res.transactions)
        this.distribute(res.transactions)        
      }, (err:any)=>{
        this.isLoading = false
        this.error = 'Error Occured'
      })
  }

  add() {
    let dialogRef = this.dialog.open(AddTransactionComponent, { width: '400px', hasBackdrop: true, disableClose: true })
    dialogRef.afterClosed().subscribe(message=>{
      this.ngOnInit()
      this.snackbar.open(message == 'Success' ? 'Added Successfully' : message, 'Close', { duration: 6000 })
    })
  }
  distribute(tray:any){
    this.transfers = tray.filter((each:any, i:any)=>(each.type == 'Transfers'))
    this.withdrawal = tray.filter((each:any, i:any)=>(each.type == 'Withdrawals'))
    this.others = tray.filter((each:any, i:any)=>(each.type == 'Others'))
    this.totalAmount(tray)
  }
  totalAmount(tray:any){
    let transfer = 0
    let withdrawal = 0
    let others = 0
    tray.map((each:any, i:any)=>{
      if (each.type == 'Transfers') {
        transfer += parseInt(each.amount)
      }
    })
    tray.map((each:any, i:any)=>{
      if (each.type == 'Withdrawals') {
        withdrawal += parseInt(each.amount)
      }
    })
    tray.map((each:any, i:any)=>{
      if (each.type == 'Others') {
        others += parseInt(each.amount)
      }
    })
    this.lineChartData[0].data = [...this.lineChartData[0].data, transfer, withdrawal, others] as any
    console.log(transfer, withdrawal, others)
  }
}
