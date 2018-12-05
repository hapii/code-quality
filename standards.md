# Angular Code Quality
## Component Classes

**In order to follow the single responsibility principle:**
- Component classes should only contain logic directly related to the view displayed in the component.
- Business logic should be contained in a service (especially if it needs to be reused).

**Classes should be made as simple as possible**
- Keep class properties to the minimum necessary for communication between the component's template and class. 
```typescript 
console.log('hello fam');
```
- 