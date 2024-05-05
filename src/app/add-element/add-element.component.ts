import { Component, Input, OnInit } from '@angular/core';
import { Elements } from '../interfaces/Elements';
import { AppService } from '../app-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent implements OnInit {
  @Input() btnMenu: any
  @Input() elements: any
  @Input() field: any
  @Input() index: any

  showNavBar!: boolean
  fieldTypeOptions = [
    { value: 'text', label: 'Text',icon:'fa fa user' },
    { value: 'inner', label: 'Inner (LTR)',icon:'fa fa user'  },
    { value: 'checkBox', label: 'Checkbox' ,icon:'fa fa user' },
    { value: 'selectBox', label: 'SelectBox' ,icon:'fa fa user' },
    { value: 'multiSelectBox', label: 'MultiSelectBox',icon:'fa fa user'  },
    { value: 'date', label: 'Date',icon:'fa fa user'  },
    { value: 'dateTime', label: 'DateTime',icon:'fa fa user'  },
    { value: 'uploadFile', label: 'UploadFile' ,icon:'fa fa user' },
    { value: 'digitalSignature', label: 'Digital Signature',icon:'fa fa user'  },
  ];

  constructor(private appService: AppService) {
    this.appService.getNavBar().subscribe(res => {
      this.showNavBar = res ? res : false;
    })
  }

  ngOnInit(): void {
  }

  onElementAdded(elementType: any) {
    this.elements.push({ type: elementType});
  }
}

