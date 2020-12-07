import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatsListComponent } from './cats-list/cats-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CatFormComponent } from './cat-form/cat-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatsFilterPipe } from './shared/cats-filter.pipe';
import { CatCardComponent } from './cat-card/cat-card.component';
import { CatLikeComponent } from './cat-like/cat-like.component';
import { AppImageInputComponent } from './app-image-input/app-image-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CatsListComponent,
    CatFormComponent,
    CatsFilterPipe,
    CatCardComponent,
    CatLikeComponent,
    AppImageInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
