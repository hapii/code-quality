import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { RefactorComponent } from './refactor/refactor.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ExampleComponent,
    RefactorComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
