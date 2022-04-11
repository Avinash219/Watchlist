import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';

@Pipe({
  pure: true,
  name: 'dateTransform',
})
export class DateTransformPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return _moment.utc(value, 'YYYYMMDD').fromNow();
  }
}
