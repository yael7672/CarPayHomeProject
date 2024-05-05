import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from '../app-service.service';
import { ElementStateService } from '../element-state.service';
import SignaturePad from "signature_pad";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-properties',
  templateUrl: './change-properties.component.html',
  styleUrls: ['./change-properties.component.css'],
  host: {
    '(keyup.ctrl.k)': 'clear()'
  }
})
export class ChangePropertiesComponent {
  showNavBar!: boolean
  @Input() element: any;
  @Input() selected: any;
  @Input() ifShowChangeType!: boolean
  @Output() closeDialog = new EventEmitter<void>();
  @Output() colorChange = new EventEmitter<{ element: any; color: any }>();
  @Output() sizeChange = new EventEmitter<{ element: any; size: any; }>();
  @Output() typeChange = new EventEmitter<{ element: any; type: any; }>();
  @Output() addValues = new EventEmitter<{ element: any; text: any; values: any}>();
  @Output() setSetting = new EventEmitter<{ element: any;   name:any }>();
  @Output() sendValues = new EventEmitter<{ api: any; headers:any }>();
  @Output() backgroudColorChange = new EventEmitter<{ element: any; backgroudColor:any }>();
  @Input() elementColor: any
  @Input() elementSize: any
  @Input() elementValue: any
  @Input() elementText: any
  @Input() elementName: any
  @Input() ifShowEditValuesOfFiled!: boolean
  @Input() ifShowSetValuesOfButton!: boolean
  @Input()  ifShowEditPropertiesOfFiled!: boolean 
  selectedType: any
  @Input() apiRequest:string =''
  @Input() headersRequest:any
  @Input() elementBackgroundColor:any
  validationError: boolean = false;
  constructor(private appService: AppService, public elementStateService: ElementStateService,private http: HttpClient) {
    this.appService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
    debugger
 
  }

  ngOnInit() {

  }

  validateUrl(url: string): boolean {
    const regex = /^(http|https):\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$/;
    return regex.test(url);
  }
  urlValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      this.http.get(control.value).subscribe(
        response => {
          resolve(null); // URL תקין
        },
        error => {
          resolve({ invalidUrl: true }); // URL אינו תקין
        }
      );
    });
  }
  changeColorE(val: any) {
    debugger
    this.updateColor(val);
  }

  changeSizeE(val: any) {
    debugger
    this.updateSize(val);
  }
  changeBackgroudColorE(newBackgroudColor: any){
    this.backgroudColorChange.emit({ element: this.selected, backgroudColor: newBackgroudColor });

  }

  updateColor(newColor: any) {
    this.colorChange.emit({ element: this.selected, color: newColor });

  }

  updateSize(newSize: any) {
    this.sizeChange.emit({ element: this.selected, size: newSize });
  }
  sendAllValues(apiRequest: any,headersRequest: any){
    this.sendValues.emit({ api: apiRequest, headers: headersRequest });

  }


  onTypeChange(newType: any) {
    this.typeChange.emit({ element: this.selected, type: newType });
  }

  addValuesToFiled(elementText:any,elementValue:any){
    debugger
    this.addValues.emit({ element: this.selected, text:elementText, values: elementValue });
  }

  setSettingToFiled( elementName:any){
    this.setSetting.emit({ element: this.selected, name:elementName });
  }

  checkHttpAddress() {
    debugger
    // בדיקת תקינות הקלט
    if (!this.isValidHttpAddress(this.apiRequest)) {
      this.validationError = true;
    } else {
      this.validationError = false;
    }
  }

  isValidHttpAddress(address: string): boolean {
    debugger
    // בודק תקינות כתובת HTTP
    const pattern = /^https?:\/\/.+/i;
    return pattern.test(address);
  }
}