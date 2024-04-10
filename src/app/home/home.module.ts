import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page/home-page.component';
import { SearchComponent } from './component/search/search.component';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [HomePageComponent, SearchComponent],
    imports: [CommonModule, MatInputModule, MatFormFieldModule],
    exports: [HomePageComponent, SearchComponent],
})
export class HomeModule {}
