import { MockHttpService } from './../mock-http.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as searchResults from './search-results.json';
import { Person } from './example.model';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
    searchText: string;
    searchSubject = new Subject();
    person: Person[];

    constructor(private http: HttpClient) {
        // console.log(searchResults);
    }

    ngOnInit() {
        this.searchText = '';
        this.person = [];

        //show people born before right now
        this.searchSubject.pipe(
            debounceTime(200)
        ).subscribe(x => {
            this.http.get<Person[]>(`people?searchValue=${x}`).subscribe(val => {
                const currentDate = new Date();
                if (val) {
                    this.person = val.filter(person => {
                        return person.birthDate < currentDate;
                    });
                }
            });
        });
    }

    search(text: string) {
        this.searchText = text;
        this.searchSubject.next(this.searchText);
    }
}
