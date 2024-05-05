import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app-service.service';
import { PopUpServiceService } from '../pop-up-service.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  @Input() title!: string;
  @Input() ifX!: boolean;
  @Input() ifXt!: boolean;
  @Input() hideButton!: any;
  @Input() textButtonBack: any;
  @Output() ClickCancel = new EventEmitter<any>();
  @Output() ClickX = new EventEmitter<any>();
  whichPopUpOpen: any;
  
  constructor(private appService: AppService, private popUpService: PopUpServiceService) {
  }

  ngOnInit(): void {
  }

}
