import { PersonService } from './../person.service';
import { debounceTime } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../example/example.model';

@Component({
  selector: 'app-refactor',
  templateUrl: './refactor.component.html',
  styleUrls: ['./refactor.component.scss']
})
export class RefactorComponent implements OnInit {
  searchSubject = new Subject<string>();
  people: Observable<Person[]>;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(200)).subscribe(searchText => {
      this.people = this.personService.searchPeople(searchText);
    });
  }

  search(text: string) {
    this.searchSubject.next(text);
  }
}