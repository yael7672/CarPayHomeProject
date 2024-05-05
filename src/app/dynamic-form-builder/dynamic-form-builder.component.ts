import { Component } from '@angular/core';
import { Positionss2 } from '../interfaces/Positionss2';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.css']
})
export class DynamicFormBuilderComponent {
  elements: any[] = [];
  selectedElement: any;
  connectedDropLists: any[] = [];
  elementId: any
  element!: HTMLElement
  elementPositions: Positionss2[] = [];
  data: any
  container: any
  renderer:any
 
  constructor() { }

  ngOnInit(): void {
  }

//   onElementAdded(elementType: string) {
//     switch (elementType) {
//       case 'title':
//         this.element = document.createElement('input');
//         this.element.textContent = 'New Title';
//         this.element.style.backgroundColor = 'red';
//         break;
//       case 'subtitle':
//         this.element = document.createElement('h3');
//         this.element.textContent = 'new subtitle';
//         break;
//       case 'image':
//         this.element = document.createElement('input');
//         // element.type = 'file';
//         // element.accept = 'image/*';
//         break;
//       case 'button':
//         this.element = document.createElement('button');
//         this.element.textContent = 'Click me';
//         break;
//       default:
//         break;
//     }
    
//     this.element.id = elementType;
//     this.element.draggable = true;
//     this.element.style.resize = 'both';
//     this.element.style.overflow = 'auto';
//     this.container = document.querySelector('.col-md-9');
//     this.container?.appendChild(this.element);
//   //   const drag = new CdkDrag(this.element);

//   // // (Optional) Set drag data (if needed)
//   // // drag.data = someData;

//   // // (Optional) Listen to drag events (dropped, moved, etc.)
//   // drag.dropped.subscribe((event) => {
//   //   // Handle dropped event (update data model, etc.)
//   // });

//   this.element.id = elementType;
//   this.element.draggable = true;  // Not strictly necessary with cdkDrag
//   this.element.style.resize = 'both';
//   this.element.style.overflow = 'auto';
//   this.container = document.querySelector('.col-md-9');
//   this.container?.appendChild(this.element);
//  }

// before
// openSettingsDialog(element: any) {
//  alert("element")
// }

// onElementAdded(elementType: string) {
//   debugger;
//   this.elements.push({ type: elementType });
// }



// drop(event: CdkDragDrop<any[]>) {
//   if (event.container === event.previousContainer) {
//     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//   }
// }
// before end
}