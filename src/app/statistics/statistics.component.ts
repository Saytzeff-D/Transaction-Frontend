import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public amount = 700

  public isLoading = true
  public error = ''
  public transactions = 0
  public transfer = 0
  public withdrawal = 0
  public others =0
  public lineChartData = [
    {
    data: [],    
    barThickness: 17,
    borderRadius: 5,
    // backgroundColor: 'green',
    // theme: 'red'
    }  
  ]
  public chartLabels = [    
    'Transfer',
    'Withdrawals',
    'Others'
  ]
  public chartOptions = {
    responsive: true, 
    // aspectRatio: 1.    
  }
  constructor(public request: RequestsService) {}

  ngOnInit(): void {
    this.request.history().subscribe((res:any)=>{
      this.isLoading = false
      // this.transactions = res.transactions
      this.totalAmount(res.transactions)
      console.log(res.transactions)            
    }, (err:any)=>{
      this.isLoading = false
      this.error = 'Error Occured'
    })
  }  
  totalAmount(tray:any){
    tray.map((each:any, i:any)=>{
      if (each.type == 'Transfers') {
        this.transfer += parseFloat(each.amount)
      }
    })
    tray.map((each:any, i:any)=>{
      if (each.type == 'Withdrawals') {
        this.withdrawal += parseFloat(each.amount)
      }
    })
    tray.map((each:any, i:any)=>{
      if (each.type == 'Others') {
        this.others += parseFloat(each.amount)
      }
    })
    this.lineChartData[0].data = [...this.lineChartData[0].data, this.transfer, this.withdrawal, this.others] as any
    console.log(this.transfer, this.withdrawal, this.others)
  }

}
