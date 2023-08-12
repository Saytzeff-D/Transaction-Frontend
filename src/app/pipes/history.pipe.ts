import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: any, history: any) {
    if(!history) return value
    let filteredHistory = value.filter((each:any)=>each.customerName.toLowerCase().includes(history) || each.amount.includes(history))
    return filteredHistory
  }

}
