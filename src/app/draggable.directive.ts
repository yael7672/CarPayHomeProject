import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  @Input() elementType!: string; // Optional input for element type identification

  private initialX!: number;
  private initialY!: number;
  private isDragging = false;

  constructor(private el: ElementRef) {}

  @HostListener('mousedown')
  onMouseDown(event: MouseEvent) {
    this.initialX = event.clientX;
    this.initialY = event.clientY;
    this.isDragging = true;
    this.el.nativeElement.classList.add('dragging'); // Add visual cue
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }

    const deltaX = event.clientX - this.initialX;
    const deltaY = event.clientY - this.initialY;

    this.el.nativeElement.style.left = `${this.el.nativeElement.offsetLeft + deltaX}px`;
    this.el.nativeElement.style.top = `${this.el.nativeElement.offsetTop + deltaY}px`;

    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    this.el.nativeElement.classList.remove('dragging'); // Remove visual cue
  }
}