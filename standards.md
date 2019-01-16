# Angular Code Quality
## Component Classes

**In order to follow the single responsibility principle:**
- Component classes should only contain logic directly related to the view displayed in the component.
- Business logic should be contained in a service (especially if it needs to be reused).
- Each service should be responsible for a single business concept only. 
  
```typescript
// Search filter logic in component class
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

// search logic in service can now be reused elsewhere in the application
searchPeople(searchText: string): Observable<Person[]> {
    return this.http.get<Person[]>(`assets/people.json`).pipe(
      map(people => {
        people = people.map(person => {
          person.birthDate = new Date(person.birthDate);
          return person;
        });

        return people.filter(person => this.searchMatches(person, searchText));
      })
    );
  }

// after moving this logic into a service our init method is much more concise
ngOnInit() {
    this.searchSubject.pipe(debounceTime(200)).subscribe(searchText => {
        this.people = this.personService.searchPeople(searchText);
    });
}
```

--- 
**Classes should be made as simple as possible**
- Keep class properties to the minimum necessary for communication between the component's template and class. 
- Use access modifiers to make it clear how a property or method is being used (public methods used in template, private for internal methods)
- 
```typescript 
// programming example/refactor properties from example app
```
- Keep methods simple 
  1. Each method should handle a single logical concept and have a clear purpose 
  2. Methods should have a return type for clarity
  3. Never use the `any` type if it can be avoided

```typescript 
// this method does a few logically separate steps that can be broken out into smaller, reusable methods
findPeopleByBirth(searchText: string, searchType: DateSearchType, date: Date): Observable<Person[]> {
    return this.http.get<Person[]>(`assets/people.json`).pipe(
        map(people => {
                people = people.map(person => {
                person.birthDate = new Date(person.birthDate);
                return person;
            });

            people = people.filter(person => {
                return person.firstName.toLowerCase().indexOf(searchText) >= 0 || person.lastName.toLowerCase().indexOf(searchText) >= 0
            });

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

// break out the logic that matches the text to first and last name
private searchMatches(person: Person, search: string): boolean {
    return person.firstName.toLowerCase().indexOf(search) >= 0 || person.lastName.toLowerCase().indexOf(search) >= 0;
}

// break out the request to get people and add map the date
searchPeople(searchText: string): Observable<Person[]> {
    return this.http.get<Person[]>(`assets/people.json`).pipe(
      map(people => {
        people = people.map(person => {
          person.birthDate = new Date(person.birthDate);
          return person;
        });
        // use the matching method here instead of inline
        return people.filter(person => this.searchMatches);
      })
    );
}

// now we have a method whose only responsibility is to match on the date
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
```

---
**On the Subject of Observables**
- Subscriptions should be kept to a minimum so we have fewer things to manage in the component.
- Use the async pipe in the template instead of unwrapping the Observable and setting the value to a property.
- Use operators in the pipe instead of checking or modifying or filtering the result in a subscription. 

```typescript
// refactor example component to use `| async` pipe and lettable operators instead of subscription
```

**Code Readability**
- Proper usage of new lines between logical steps helps readability
- Give anonymous function parameters descriptive names

---

**Why do this?**
- Makes code more maintainable.
- Easier to understand logic if code is broken up properly.
- Easier to make modifications to existing code. 