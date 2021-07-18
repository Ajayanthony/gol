import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectkeys'
})
export class ObjectkeysPipe implements PipeTransform {

  transform(value: {[key: string]: any}, ...args: unknown[]): string[] {
    console.log(Object.keys(value));

    return Object.keys(value);
  }

}
