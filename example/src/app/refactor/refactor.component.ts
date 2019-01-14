import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-refactor',
  templateUrl: './refactor.component.html',
  styleUrls: ['./refactor.component.scss']
})
export class RefactorComponent implements OnInit {
  searchText: string;
  searchSubject = new Subject();

  constructor(private http: HttpClient) {
    // console.log(searchResults);
   }

  ngOnInit() {
    this.searchText = '';

    this.searchSubject.pipe(debounceTime(200)).subscribe(x => {
      this.http.get(`things?search=${x}`).subscribe(val => {
        
      });
    });
  }

  searchForThing(text: string) {
    this.searchText = text;
    this.searchSubject.next(this.searchText);
  }
}