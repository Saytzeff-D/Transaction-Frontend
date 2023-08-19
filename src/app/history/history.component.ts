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
  public isDeleting = false
  public error = ''

  public dataSource:any = []
  public filterHistory = ''
  public offset:any
  
  constructor(public request: RequestsService) { }
  ngOnInit(): void {
    this.offset = (new Date().getTimezoneOffset());
    console.log(this.offset)
    this.request.history().subscribe((res:any)=>{
      this.isLoading = false
      this.dataSource = res.transactions               
    }, (err:any)=>{
      this.isLoading = false
      this.error = 'Error Occured'
    })      
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
  delete(id:any){
    this.isDeleting = true
    this.request.deleteHistory({id: id}).subscribe(res=>{
      this.dataSource = this.dataSource.filter((each:any, i:any)=>(each._id !== id))
      this.isDeleting = false
    }, err=>{
      console.log(err)
      this.isDeleting = false
    })
  }

}
