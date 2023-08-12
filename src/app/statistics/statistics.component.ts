import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public amount = 700

  public lineChartData = [
    {
    data: [20000, 12500, 9000 ],    
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

  ngOnInit(): void {
      
  }

}
