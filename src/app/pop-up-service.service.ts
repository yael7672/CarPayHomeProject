import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpServiceService {

  private kindOfPopUp$: BehaviorSubject<any> = new BehaviorSubject(null);
  private navBar$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isPopUpOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isSpinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(@Inject(DOCUMENT) private document: Document) {
  }


  setClosePopUp() {
    this.kindOfPopUp$.next(false)
  }
  

  
}
