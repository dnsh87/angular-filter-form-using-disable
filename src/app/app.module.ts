import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ExampleComponent } from './example/example.component';
import { SearchableDirective } from './searchable.directive';
import { SearchDirective } from './search.directive';
import { LabelComponent } from './label/label.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, ExampleComponent, SearchableDirective, SearchDirective, LabelComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
