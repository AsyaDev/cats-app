import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatCardComponent } from './cat-card/cat-card.component';
import { CatFormComponent } from './cat-form/cat-form.component';
import { CatsListComponent } from './cats-list/cats-list.component';


const routes: Routes = [
  {path: '', component: CatsListComponent},
  {path: 'cat-card/:id', component: CatCardComponent},
  {path: 'cat-form', component: CatFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
