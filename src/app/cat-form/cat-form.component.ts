import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat, CatsService } from '../shared/cats.service';

@Component({
  selector: 'app-cat-form',
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.sass']
})
export class CatFormComponent implements OnInit {
  cats$: Observable<Cat[]>;
  @Input() cat: Cat;

  catForm: FormGroup;
  private img: string;
  private error: boolean;

  constructor(private catsService: CatsService, private router: Router) {

    this.catForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    this.img = this.cat ? this.cat.img : '';
    if (this.cat) {
      this.catForm.setValue({ name: this.cat.name, description: this.cat.description });
    }
  }

  imgChangedHandler(img: string) {
    this.img = img;
  }
  onError(error: boolean) {
    this.error = error ? true : false;
    }

  addCat() {
    const cat: Cat = {
      _id: this.cat ? this.cat._id : this.catsService.getUnicId(),
      name: this.catForm.value.name,
      img: this.img,
      description: this.catForm.value.description,
      like: this.cat ? this.cat.like : 0
    };
    if (this.cat) {
      this.catsService.editCat(cat);
    } else {
      this.catsService.addCat(cat);
    }
    this.router.navigate(['']);
  }
}
