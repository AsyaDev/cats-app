import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from './cats.service';

@Pipe({
    name: 'catsFilter'
})
export class CatsFilterPipe implements PipeTransform {
    transform(cats: Cat[], search: string = ''): Cat[] {
        if (!search.trim()) {
            return cats;
        }
        return cats.filter(cat => {
            return cat.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    }
}
