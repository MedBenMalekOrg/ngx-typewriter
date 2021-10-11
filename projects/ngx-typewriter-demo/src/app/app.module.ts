import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxTypewriterModule} from "ngx-typewriter";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxTypewriterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
