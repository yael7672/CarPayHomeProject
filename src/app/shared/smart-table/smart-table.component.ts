import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.css']
})
export class SmartTableComponent implements OnInit {
  @Input() ifEdit!: boolean;
  @Input() ifDelete!: boolean;
  @Input() thArr: any;
  @Input() ifSortDown!: boolean
  @Input() tableData: any
  @Input() tableDataKeys: any
  @Input() hideSort: any
  @Input() ifShowpagination: any
  @Input() id: any
  @Input() widteOfCard!: string
  @Output() SortTableDown = new EventEmitter<any>();
  @Output() SortTableUp = new EventEmitter<any>();
  @Output() SelectedData = new EventEmitter<any>();
  @Output() EditData = new EventEmitter<any>();
  @Output() DeleteData = new EventEmitter<any>();
  @Output() CreateData = new EventEmitter<any>();
  @Input() typeOfPaymentMethod!: any;
  @Input() indexRow!: any;
  p: any

  isPopUpOpen: any;
  arr: any = [];
  isUnder1100: any;

  constructor(private route: Router, private appService: AppService) {
    var appProperties = this.appService.getAppProperties()
    this.isUnder1100 = appProperties.isUnder1680$.value;
  }

  ngOnInit(): void {

  }

  returnColDataByType(colData: any, tableDataKey: any) {
    if (tableDataKey && typeof tableDataKey === 'string') {
      return colData[tableDataKey]
    }
    else {
      if (colData[tableDataKey[0]]?.length >= 1) {
        this.arr = [];
        for (let i = 0; i < colData.TeamMemmber?.length; i++) {
          if (colData[tableDataKey[0]]) {
            this.arr += " , " + colData[tableDataKey[0]][i][tableDataKey[1]];
          }
          else return null;
        }
        return this.arr;
      }
      else {
        if (colData[tableDataKey[0]]) {
          return colData[tableDataKey[0]][tableDataKey[1]]
        }
        else return null;
      }
    }
  }

  sortTableDown(th: any) {
    this.SortTableDown.emit(th);
  }

  sortTableUp(th: any) {
    this.SortTableUp.emit(th);
  }

  selectedData(val: any) {
    this.SelectedData.emit(val);
  }
  getColor(score: number): string {
    if (score > 90) {
      return 'blue';
    } else if (score < 70) {
      return 'red';
    } else {
      return '';
    }
  }

}
