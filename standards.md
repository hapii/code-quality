# Angular Code Quality
## Component Classes

**In order to follow the single responsibility principle:**
- Component classes should only contain logic directly related to the view displayed in the component.
- Business logic should be contained in a service (especially if it needs to be reused).
- Each service should be responsible for a single business concept only. 
  
```typescript
// programming example/refactor moving business logic out of component into service
```

--- 
**Classes should be made as simple as possible**
- Keep class properties to the minimum necessary for communication between the component's template and class. 
- Use access modifiers to make it clear how a property or method is being used
```typescript 
// programming example/refactor properties from example app
```
- Keep methods simple 
  1. Each method should handle a single logical concept and have a clear purpose 
  2. Methods should have a return type for clarity

```typescript 
// programming example/refactor of a complex method into smaller, more maintainable methods
```

---
**On the Subject of Observables**
- Subscriptions should be kept to a minimum so we have fewer things to manage in the component.
- Use the async pipe in the template instead of unwrapping the Observable and setting the value to a property.
- Use operators in the pipe instead of checking or modifying the result in a subscription. 

```typescript
// refactor example component to use `| async` pipe and lettable operators instead of subscription
```

**Code Readability**
- Proper usage of new lines between logical steps helps readability
- Give anonymous function parameters descriptive names

```typescript
// example refactor of a method with proper spacing and usage of descriptive parameter names for anonymous functions
```
---

**Why do this?**
- Makes code more maintainable.
- Easier to understand logic if code is broken up properly.
- Easier to make modifications to existing code. 