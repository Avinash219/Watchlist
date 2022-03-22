import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';

@Pipe({
  pure: true,
  name: 'dateTransform',
})
export class DateTransformPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('Fired');
    return _moment.utc(value, 'YYYYMMDD').fromNow();
  }
}
