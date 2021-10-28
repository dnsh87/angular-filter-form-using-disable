import { Directive, OnInit } from '@angular/core';
import { NgControl, FormGroupDirective, ControlContainer, NgForm } from '@angular/forms';
@Directive({
  selector: '[appSearch]'
})
export class SearchDirective implements OnInit{

  constructor(control: NgControl) { 
    
  }
  ngOnInit() {
// this.control.valueChanges.subscribe(v=>console.log(v));
  }
}