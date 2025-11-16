import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    // Reemplaza etiquetas HTML por vacío
    return value.replace(/<[^>]*>/g, '');
  }
}
