import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElementStateService {
  private elementSettings: { [key: string]: { color: string, size: number } } = {};

  private kindOfElement$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setElementSettings(elementType: string, color: string, size: number) {
    this.elementSettings[elementType] = { color, size };
  }

  getElementColor(elementType: string) {
    return this.elementSettings[elementType]?.color;
  }

  getElementSize(elementType: string) {
    return this.elementSettings[elementType]?.size;
  }

  setSpecificElement(data: boolean, type: string) {
    var obj = {
      title: type === 'title' ? data : false,
      subTitle: type === 'subtitle' ? data : false,
    }
    this.setKindOfElement(obj)
  }
  setKindOfElement(data: any) {
    this.kindOfElement$.next(data)
  }

  getKindOfElement() {
    return this.kindOfElement$;
  }
}