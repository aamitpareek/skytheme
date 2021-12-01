import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skypipe'
})
export class SkypipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
