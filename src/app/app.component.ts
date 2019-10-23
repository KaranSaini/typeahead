import { Component } from '@angular/core';
import { fromEvent, from, of } from 'rxjs';
import { map, filter, tap, mergeMap, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  states = ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new hampshire', 'new jersey', 'new mexico', 'new york', 'north carolina', 'north dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode island', 'south carolina', 'south dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west virginia', 'wisconsin', 'wyoming'];

  typeaheadCont;

  onKey(typed) {
    of(typed)
      .pipe(
        map((e): string => e.target.value.toLowerCase()),
        tap(() => this.typeaheadCont = ''),
        filter(val => val.length > 2),
        mergeMap(val =>
          from(this.states)
          .pipe(
            filter(state => state.includes(val)),
            map(state => state.split(val).join('<b>' + val + "</b>")),
            reduce((prev: any, state) => prev.concat(state), [])
          )
        )
      )
      .subscribe(
        (stateList: string[]) => this.typeaheadCont += '</br>'
        + stateList.join('</br>')
      );
  }
}
