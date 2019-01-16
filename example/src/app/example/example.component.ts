import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Person } from './example.model';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
    searchText: string;
    searchSubject = new Subject();
    people: Person[];

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.searchText = '';
        this.people = [];
        this.searchSubject.subscribe(x => {
            this.http.get<Person[]>(`assets/people.json`).subscribe(val => {
                const currentDate = new Date();
                if (val) {
                    this.people = val.filter(person => {
                        return person.firstName.toLowerCase().indexOf(this.searchText) >= 0 || person.lastName.toLowerCase().indexOf(this.searchText) >= 0;
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
