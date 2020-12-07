import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Cat, CatsService } from '../shared/cats.service';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.sass']
})
export class CatCardComponent implements OnInit {
  cats$: Observable<Cat[]>;
  cat: Cat;
  editForm = false;
  private id: string;
  private loading = true;

  constructor(private catsService: CatsService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => this.id = data);
  }

  ngOnInit() {
    this.catsService.fetchAll().then(() => {
      this.cats$ = this.catsService.cats$;
      if (this.catsService.findId(this.id)) {
        this.catsService.getCat(this.id).subscribe(c => {
          this.cat = c;
          this.loading = false;
        });
      } else { this.goBack(); }
    });
  }
  showHideForm() {
    this.editForm = this.editForm = !this.editForm;
  }
  removeCat(id: string) {
    if (confirm('Are you sure to delete this cat')) {
      this.catsService.removeCat(id);
      this.router.navigate(['']);
    }
  }
  goBack() {
    this.router.navigate(['']);
  }
}
