import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SearchComponent } from './component/search/search.component';



@NgModule({
  declarations: [
    HomePageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomePageComponent,
    SearchComponent
  ]
})
export class HomeModule { }
