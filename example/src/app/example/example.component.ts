import { MockHttpService } from './../mock-http.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as searchResults from './search-results.json';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() isExample: boolean;
  @Input() whoAmI: string;

  searchText: string;
  searchSubject = new Subject();

  // constructor(private http: MockHttpService) {
  //   console.log(searchResults);
  //  }

  ngOnInit() {
    this.isExample = false;
    this.whoAmI = 'Kevin';
    this.searchText = '';

    this.searchSubject.pipe(debounceTime(200)).subscribe(x => {
      // this.http.get(`things?search=${x}`).subscribe(val => {

      // });
    });
  }

  searchForThing(text: string) {
    this.searchText = text;
    this.searchSubject.next(this.searchText);
  }
}
