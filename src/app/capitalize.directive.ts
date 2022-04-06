import { Directive,  ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private element: ElementRef, private control: NgControl) { }

  @HostListener('change', ['$event'])
  
  onBlur(event: KeyboardEvent){
    let input: HTMLInputElement = this.element.nativeElement;
    input.value = this.control.value.toUpperCase();
  }

}
