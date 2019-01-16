import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './example/example.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) { }

  searchPeople(searchText: string): Observable<Person[]> {
    return this.http.get<Person[]>(`assets/people.json`).pipe(
      map(people => {
        people = people.map(person => {
          person.birthDate = new Date(person.birthDate);
          return person;
        });

        return people.filter(person => this.searchMatches);
      })
    );
  }

  findPeopleByBirth(searchText: string, searchType: DateSearchType, date: Date): Observable<Person[]> {
    return this.searchPeople(searchText).pipe(
      map(people => {
        switch (searchType) {
          case DateSearchType.Before:
            people.filter(person => person.birthDate < date);
            break;
          case DateSearchType.After:
            people.filter(person => person.birthDate > date);
            break;
          case DateSearchType.On:
            people.filter(person => person.birthDate === date);
            break;

            return people;
        }
      })
    );
  }

  // findPeopleByBirth(searchText: string, searchType: DateSearchType, date: Date): Observable<Person[]> {
  //   return this.http.get<Person[]>(`assets/people.json`).pipe(
  //     map(people => {
  //       people = people.map(person => {
  //         person.birthDate = new Date(person.birthDate);
  //         return person;
  //       });

  //       people = people.filter(person => {
  //         return person.firstName.toLowerCase().indexOf(searchText) >= 0 || person.lastName.toLowerCase().indexOf(searchText) >= 0
  //       });

  //       switch (searchType) {
  //         case DateSearchType.Before:
  //           people.filter(person => person.birthDate < date);
  //           break;
  //         case DateSearchType.After:
  //           people.filter(person => person.birthDate > date);
  //           break;
  //         case DateSearchType.On:
  //           people.filter(person => person.birthDate === date);
  //           break;

  //         return people;
  //       }
  //     })
  //   );
  // }

  private searchMatches(person: Person, search: string): boolean {
    return person.firstName.toLowerCase().indexOf(search) >= 0 || person.lastName.toLowerCase().indexOf(search) >= 0;
  }
}

export enum DateSearchType {
  Before,
  After,
  On
}
