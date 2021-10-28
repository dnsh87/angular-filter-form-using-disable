import { Directive, Input, ElementRef, OnInit, Renderer2, AfterViewInit, ViewChildren, Optional, OnChanges, SimpleChanges, QueryList } from '@angular/core';
import { NgControl, FormGroupDirective, ControlContainer, NgForm } from '@angular/forms';
import { SearchDirective } from './search.directive';
import { LabelComponent } from './label/label.component';
@Directive({
  selector: '[searchable]',
  exportAs: 'searchable'
})
export class SearchableDirective implements OnInit, AfterViewInit, OnChanges {
  @Input('searchable') searchable;
   @ViewChildren(LabelComponent) label: QueryList<LabelComponent>; 
  // @ViewChild(SearchDirective) search: SearchDirective;
  constructor(private elementRef: ElementRef, private render: Renderer2, private control: NgControl,
    @Optional() private searchDir: SearchDirective,

  ) { }
  ngOnInit() {
    
    //  this.render.setAttribute(this.elementRef.nativeElement, 'data', this.searchable);

    //  console.log(this.elementRef.nativeElement);

  }

  ngAfterViewInit() {

    this.control.valueChanges.subscribe(value => {
      // console.log(this.label);
      // console.log(this.elementRef.nativeElement.parentNode.parentNode);
    })
    // console.log(this.elementRef.nativeElement.innerText);

  }



  ngOnChanges(change: SimpleChanges) {

  }

}