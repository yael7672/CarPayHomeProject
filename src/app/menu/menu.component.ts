import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Elements } from '../interfaces/Elements';
import { PopUpServiceService } from '../pop-up-service.service';
import { AppService } from '../app-service.service';
import { ElementStateService } from '../element-state.service';
import { ChangePropertiesComponent } from '../change-properties/change-properties.component';
import { DOCUMENT, DatePipe } from '@angular/common';
import SignaturePad from 'signature_pad';
import { UserService } from '../user.service';
import swal from 'sweetalert';
import { ElementsValues } from '../interfaces/ElementsValues';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit, OnInit {
  @Output() elementAdded = new EventEmitter<any>();
  elementType: any
  element: any
  selectedElement: any
  elementColor: any
  elementSize: any
  elementPropertiesMap: Map<string, { color: string, size: number }> = new Map();
  elementProperties: any
  tabLink = [
    { title: 'add ', state: 'active', showNavBar: 'false' },
    { title: 'change properties ', state: 'disabled', showNavBar: 'true' },
  ];
  elementsArrFromSs: any
  elementsArr: any[] = [];
  fieldArr: any[] = [];
  buttonMenu: Elements[] = [{ type: 'title', name: 'Title', icon: "fa fa-header" },
  { type: 'subtitle', name: 'SubTitle', icon: "fa fa-font	" },
  { type: 'field', name: 'Field', icon: "fas fa-edit" },
  { type: 'image', name: 'Image', icon: "fas fa-image" },
  { type: 'button', name: 'Button', icon: "fas fa-square" }];

  selectedField = 'option1';
  showNavBar = false
  kindOfElement: any
  showChangeTypeOfField = false
  @ViewChild('changePropertiesComponent')
  changePropertiesComponent!: ChangePropertiesComponent;
  showSetValuesOfFiled = false
  ShowEditPropertiesOfFiled = false
  ValueSelectedeArr: any[] = []
  ngxDisabled = false;
  MoreValueSelectedArr: any = [];
  todayDate!: any;
  myDate = new Date()
  showSetValuesOfButton = false
  apiRequest!: string
  headersRequest: any
  serialNumber: any
  elementValue: any
  elementName: any
  valuesOfFormToUpdate2: any
  valuesOfFormToUpdate: ElementsValues[] = []
  hidePDF = false
  hideImage = false
  imagesBeforeUploadArray: string[] = [];
  filesBeforeUploadArray: string[] = [];
  filesSelectedInSelectionButton: string[] = [];
  imageSelectedInSelectionButton: string[] = [];
  fileOrImageInSelectedInSelectionButton: string[] = [];
  imageBase64: any
  fileBase64: any
  elementBackgroundColor: any
  elementFontFamily: any
  valuesOfFormToUpdateJson!: any
  constructor(private appService: AppService, public elementStateService: ElementStateService
    , private datePipe: DatePipe, private userService: UserService) {
    this.appService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
    this.elementsArrFromSs = sessionStorage.getItem("elementsArr")
    if (this.elementsArrFromSs) {
      this.elementsArr = JSON.parse(this.elementsArrFromSs)
    }
    this.todayDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  sig!: SignaturePad;

  ngAfterViewInit() {
    debugger
    this.changePropertiesComponent?.colorChange?.subscribe((colorData) => {
      this.updateElementColor(colorData.element, colorData.color);
    });
    this.changePropertiesComponent?.sizeChange?.subscribe((sizeData) => {
      this.updateElementSize(sizeData.element, sizeData.size);
    });
  }

  ngOnInit() {
    // this.sig = new SignaturePad(this.canvas.nativeElement);

  }

  clear() {
    this.sig.clear();
  }

  onElementAdded(elementType: any) {
    debugger
    this.elementAdded.emit(elementType)
    this.sig = new SignaturePad(this.canvas.nativeElement);
  }


  onDragStart(event: any) {
    event.dataTransfer?.setData('text/plain', event.target.id);
  }
  startDrawing() {
    debugger
    this.sig = new SignaturePad(this.canvas.nativeElement);
  }

  changeProperties(elementType: any, index: any, event: any) {
    debugger
    this.serialNumber = index
    this.elementColor = this.elementsArr[this.serialNumber].elementColor
    this.elementSize = this.elementsArr[this.serialNumber].elementSize
    this.elementValue = this.elementsArr[this.serialNumber].elementValue
    this.elementName = this.elementsArr[this.serialNumber].elementName
    if (elementType == "digitalSignature") {
      this.sig = new SignaturePad(this.canvas.nativeElement);
    }
    if (elementType == "field") {
      this.showChangeTypeOfField = true
      this.showSetValuesOfFiled = false
      this.ShowEditPropertiesOfFiled = false
      this.showSetValuesOfButton = false

    }
    if (elementType == "checkBox" || elementType == "selectBox" || elementType == "multiSelectBox") {
      this.showSetValuesOfFiled = true
      this.ShowEditPropertiesOfFiled = true
      this.showChangeTypeOfField = false
      this.showSetValuesOfButton = false
    }

    if (elementType == "button") {
      this.showSetValuesOfButton = true
      this.showSetValuesOfFiled = false
      this.ShowEditPropertiesOfFiled = true
      this.showChangeTypeOfField = false
    }
    if (elementType == "title" || elementType == "subtitle") {
      this.ShowEditPropertiesOfFiled = true
      this.showSetValuesOfButton = false
      this.showSetValuesOfFiled = false
      this.showChangeTypeOfField = false
    }
    if (elementType == "image" || elementType == "uploadFile") {
      this.readFile(event)
    }
    this.appService.setNavBar(true);
    this.selectedElement = elementType
  }

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    this.onFileChange(fileEvent)
    if (file.size > 3145940) {
      swal("הקובץ שהועלה גדול מידי")
    }
  }

  onFileChange(event: any) {
    const myFiles = event.target.files;
    this.imagesBeforeUploadArray = [];
    this.filesBeforeUploadArray = [];
    this.filesSelectedInSelectionButton = [];
    this.imageSelectedInSelectionButton = [];
    this.appService.readFiles(myFiles)
      .then(filesBase64 => {
        const file = event.target.files[0];
        if (file.type.startsWith("image")) {
          this.hideImage = true
          this.imageSelectedInSelectionButton = filesBase64;
          for (const fileSelectedInSelectionButton of this
            .imageSelectedInSelectionButton) {
            this.imagesBeforeUploadArray.push(fileSelectedInSelectionButton);
            this.imageBase64 = this.imagesBeforeUploadArray.join('*')
            this.elementsArr[this.serialNumber].value = this.imageBase64
          }
        }
        else {
          this.hidePDF = true
          this.filesSelectedInSelectionButton = filesBase64;
          for (const fileSelectedInSelectionButton of this
            .filesSelectedInSelectionButton) {
            this.filesBeforeUploadArray.push(fileSelectedInSelectionButton);
            this.fileBase64 = this.filesBeforeUploadArray.join('*')
            this.elementsArr[this.serialNumber].value = this.fileBase64
          }
        }
      })
      .then(console.log);
    console.log(this.imagesBeforeUploadArray)
  }
  // this.fileBase64Incident = this.imagesBeforeUploadArray.join('*')

  setTextOfProperty(elementText: any, element: any) {
    this.elementsArr[this.serialNumber].text = elementText;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  setValueOfProperty(elementValue: any, element: any) {
    this.elementsArr[this.serialNumber].value = elementValue;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateElementColor(element: any, newColor: any) {
    this.elementColor = newColor
    this.elementsArr[this.serialNumber].elementColor = newColor;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateElementBackgroundColor(element: any, backgroundColor: any) {
    debugger
    this.elementBackgroundColor = backgroundColor
    this.elementsArr[this.serialNumber].elementBackgroundColor = backgroundColor;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateElementSize(element: any, newSize: number) {
    this.elementSize = newSize
    this.elementsArr[this.serialNumber].elementSize = newSize;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateElementFontFamily(element: any, fontFamily: any) {
    this.elementFontFamily = fontFamily
    this.elementsArr[this.serialNumber].elementFontFamily = fontFamily;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateFiledType(element: any, newType: string) {
    this.elementsArr[this.serialNumber].elementType = newType;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  addValuesToFiled(element: any, textInput: any, values: any) {
    const existingValues = this.elementsArr[this.serialNumber].elementsValues || [];
    const newValue = {
      elementValue: values,
      elementText: textInput
    };
    if (element == "selectBox" || element == "multiSelectBox") {
      existingValues.push(newValue);
      this.elementsArr[this.serialNumber].elementsValues = existingValues;
    }
    else {
      this.elementsArr[this.serialNumber].elementsValues = newValue;
    }
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  setSettingToFiled(element: any, nameInput: any) {
    debugger
    this.elementName = nameInput
    this.elementsArr[this.serialNumber].elementName = nameInput;
    sessionStorage.setItem("elementsArr", JSON.stringify(this.elementsArr))
  }

  updateValuesOfForm(apiRequest: any, headers: any) {
    debugger
    // this.valuesOfFormToUpdate2 = {};
    // for (const item of this.elementsArr) {
    //   for (const key in item) {
    //     if (key === 'elementName') {
    //       this.valuesOfFormToUpdate2[`${item['elementName']}`] = item[key] ? item[key] : "";
    //     }
    //   }
    // }
    // console.log(this.valuesOfFormToUpdate2);

    this.valuesOfFormToUpdate = [];
    for (const item of this.elementsArr) {
      for (const key in item) {
        if (key == 'type') {
          if (item['type'] != 'title' && item['type'] != 'subtitle' && item['type'] != 'button') {
            const itemType = item['type'];
            const existingValueIndex = this.valuesOfFormToUpdate.findIndex(
              (existingItem) => existingItem.type == itemType
            );

            if (existingValueIndex !== -1) {
              if (Array.isArray(this.valuesOfFormToUpdate[existingValueIndex].value)) {
                this.valuesOfFormToUpdate[existingValueIndex].value.push(item['value']);
              } else {
                this.valuesOfFormToUpdate[existingValueIndex].value = [
                  this.valuesOfFormToUpdate[existingValueIndex].value,
                  item['value']
                ];
              }
            } else {
              this.valuesOfFormToUpdate.push({
                type: itemType,
                value: item['value'] ? item['value'] : ((item['elementValue'] ? item['elementValue'] : item['elementsValues']) ? item['elementsValues'] : "")
              });
            }
          }
        }
      }
    }
    this.valuesOfFormToUpdate = this.valuesOfFormToUpdate.map((item) => {
      return { ...item, value: item.value };
    });
    this.valuesOfFormToUpdateJson = JSON.stringify(this.valuesOfFormToUpdate, null, 2);
    console.log(this.valuesOfFormToUpdateJson);
    const cleanedJsonString = this.valuesOfFormToUpdateJson.trim().replace(/(\r\n|\n|\r|\s+)/gm, '');

    const parsedValues = JSON.parse(cleanedJsonString);
    console.log(parsedValues);

    this.userService.UpdateValuesOfForm(this.valuesOfFormToUpdateJson, apiRequest, headers).subscribe(
      (res: any) => {
        swal("פרטיך נשמרו בהצלחה!")
      },
      (err: any) =>
        console.log(err.error)
    )
  }
}