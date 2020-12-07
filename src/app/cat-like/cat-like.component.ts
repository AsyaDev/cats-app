import { Component, Input, OnInit } from '@angular/core';
import { Cat, CatsService } from '../shared/cats.service';

@Component({
  selector: 'app-cat-like',
  templateUrl: './cat-like.component.html',
  styleUrls: ['./cat-like.component.sass']
})
export class CatLikeComponent implements OnInit {
  private disabledLike = false;
  @Input() cat: Cat;

  constructor(private catsService: CatsService) { }

  ngOnInit() { }

  like(cat: Cat) {
    cat.like = cat.like + 1;
    this.catsService.catLike(cat._id, cat.like);
  }
  dislike(cat: Cat) {
    cat.like = cat.like - 1;
    this.catsService.catLike(cat._id, cat.like);
  }

}
