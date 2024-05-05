import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app-service.service';
import { PopUpServiceService } from 'src/app/pop-up-service.service';

@Component({
  selector: 'app-smart-card',
  templateUrl: './smart-card.component.html',
  styleUrls: ['./smart-card.component.css']
})
export class SmartCardComponent implements OnInit {
  @Input() src!: string;
  @Input() thArr!: any;
  @Input() tableData!: any;
  @Input() tableDataKeys!: any;
  @Input() kindOfCard!: any;
  @Input() title!: string;
  @Input() arrFunc: any;
  @Input() nameOfFunc: any;
  @Input() sizeOfCard: any;
  @Input() ifX: any;
  constructor(public appService: AppService, private router: Router, private popUpService: PopUpServiceService,) { }

  ngOnInit(): void {
  }

}
