import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Cat {
    _id: string;
    name: string;
    like?: number;
    img: string;
    description: string;
}

@Injectable({ providedIn: 'root' })

export class CatsService {

    private jsonUrl = 'assets/cats.json';
    private readonly _cats = new BehaviorSubject<Cat[]>([]);
    readonly cats$ = this._cats.asObservable();
    private catsRemoved = false;

    get cats(): Cat[] {
        return this._cats.getValue();
    }

    set cats(val: Cat[]) {
        this._cats.next(val);
    }

    constructor(private http: HttpClient) { }

    async fetchAll() {
        if (!this.cats.length && !this.catsRemoved) {
            this.cats = await this.fetchCats().toPromise();
        } else {
            return this.cats;
        }
    }
    private fetchCats() {
        return this.http.get<Cat[]>(this.jsonUrl);
    }
    removeCat(id: string) {
        if (this.cats.length === 1) {
            this.catsRemoved = true;
        }
        this.cats = this.cats.filter(c => c._id !== id);
    }
    getCat(id: string): Observable<Cat> {
        return this.cats$.pipe(
            map(c => c.find(c => c._id === id))
        );
    }

    catLike(id: string, like: number) {
        const cat = this.cats.find(c => c._id === id);
        const index = this.cats.indexOf(cat);
        this.cats[index] = {
            ...cat,
            like
        };
        this.cats = [...this.cats];
    }
    findId(id: string) {
        const cat = this.cats.find(c => c._id === id);
        const result = cat ? true : false;
        console.log(result);
        return result;
    }
    getUnicId() {
        const lastCat = this.cats[this.cats.length - 1];
        const lastId = +lastCat._id + 1;
        return lastId.toString();
    }
    addCat(cat: Cat) {
        this.cats.push(cat);
    }
    editCat(cat: Cat) {
        this.cats = this.cats.map(c => {
            if (c._id === cat._id) {
                return cat;
            }
            return c;
        });
    }
}
