import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';
import { HttpClientModule } from "@angular/common/http";

 
@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    SharedModule,
    GifsModule,
    HttpClientModule //peticiones https o http
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
