import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cat, CatsService } from '../shared/cats.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.sass']
})
export class CatsListComponent implements OnInit {
  cats$: Observable<Cat[]>;

  private searchString = '';

  constructor(private catsService: CatsService, private router: Router) {
  }

  ngOnInit() {
    this.catsService.fetchAll();
    this.cats$ = this.catsService.cats$;
  }
}
