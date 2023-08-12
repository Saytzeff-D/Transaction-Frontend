import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {
  public isLoading = true
  public error = ''

  public dataSource:any = []
  public filterHistory = ''
  
  constructor(public request: RequestsService) { }
  ngOnInit(): void {
    this.request.history().subscribe((res:any)=>{
      this.isLoading = false
      this.dataSource = res.transactions
      console.log(res.transactions)            
    }, (err:any)=>{
      this.isLoading = false
      this.error = 'Error Occured'
    })      
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

}
