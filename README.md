# TypeScript 3 Fundamentals V2
Frontend Masters: TypeScript 3 Fundamentals, V2

## Introduction

### Flags

    ./node_modules/.bin/tsc src/index.ts
    
    ./node_modules/.bin/tsc src/index.ts --target ES2015
    
    node src/index.js
    
    ./node_modules/.bin/tsc src/index.ts --target ES2017 --module commonjs 
    
    node src/index.js
    
    ./node_modules/.bin/tsc src/index.ts --target ES2017 --module commonjs --watch
    
    
 Compiler options: https://www.typescriptlang.org/docs/handbook/compiler-options.html
 
 ### Configuring TypeScript
 
    ./node_modules/.bin/tsc --project tsconfig.json
    
## TypeScript Basics

### Variables
    Simple variables, 
    
    array & tuples, 
    
    objects, 
    
    Union & Intersection Type
    
```javascript
const y = "hello world";
```
The type of y is literally the string hello world. And the reason for this, the reason that we can make this type so much more specific, and it's specific because this variable cannot hold any arbitrary string. If we think of types as sets, right, it's like buckets of allowed values.

This can hold specifically a string whose value is hello world, and no other string. If we tried to change it down here and set it to, well if we tried to reassign it, we'd run into a problem in general, because it's a const.

So this is what we would call a literal type. And that means you're enumerating a set of allowed values, specific string, specific numbers, something like that.

### Variable Declaration

So let's look at separating variable declarations and initializations. So, often, we need to do this. One place I can think of that I do this is if I have a variable that takes on a different value based on some conditions. Maybe I have a case switch with five or six case clauses, and I wanna set the value of something based on which of those clauses I fall into.
```javascript
let z;
z = 41;
z = "abc"
```

z takes on a type of any. It's basically a wildcard. Well, type systems, in general, call this a **top type**. Top types can take any value.

I err on the side of providing type information in a few specific places. Variables with initializers, not one of those places because TypeScript can always infer at that location. Now, I'll be very clear to point out spots where I always put type information as a way of kind of setting deliberate boundaries around pieces of code.

Basically, what I'm trying to do when I provide type information is provide an explicit contract between two things, and keep myself honest on both sides of that contract. But here, it would sort of just be extra stuff. But I would write my docs in the same way to be clear.

### Arrays & Tuples
Simple array type can be expressed using []

```javascript
let aa: number[] = [];
aa.push(33);
aa.push("abc"); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.
```

Array of never, never is type script **bottom type**.

```javascript
// Example: array of never
let bb = []; // equivalent to let bb: never[]
bb.push(66);
bb.push('xyz');
```

So an array of nevers, yes it's an array. But without additional information. TypeScript doesn't have what it needs in order to make a nice, safe choice for you.

```javascript
let cc = [9];
cc.push(100);
cc.push('pop'); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.
```

Now, if we had even one element, it's gonna be able to make a reasonable assumption here.

So, **tuple** is a fancy word. Just means array. It's an **array of a fixed length**, and an **array that comes with a convention**. So if we were to define a data structure that could contain a street address, we could use an object with property names like house number, street name, postal code, city. And then we can pluck things out as we need them.

```javascript
let address: [number, string, string, number] = [
    123,
    "Fake Street",
    "Nowhere, USA",
    10110
];

address = [1, 2, 3, 4]; // Type 'number' is not assignable to type 'string'.
```

### Object Types & Interfaces
```javascript
let ll : { housenumber: number, streetName: string }

ll = {
    houseNumber: 3,
    streetNumber: 1533
};

// ll = {
//    streetNumber: 1533
// }; 
// error TS2741: Property 'houseNumber' is missing in type '{ streetNumber: number; }' but required in type '{ houseNumber: number; streetNumber: number; }'.
```
Object types here, they look kind of like object-values, except instead of key-value, you have key type.

If you really wanted to make something optional, just use the **question mark**.

```javascript
let m : { make: string, model?: number };

m = {
    make: "BMW"
};
```

For now, you can think of it as only working with object types

```javascript
interface Loc {
    longitude: number;
    latitude: number;
}

let lll : Loc = {
    longitude: 1242142342,
    latitude: 2352525
};
```

### Intersection & Union Types
Intersection type
```javascript
interface HasPhoneNumber {
    name: string;
    phone: number;
}

interface HasEmail {
    name: string;
    email: string;
}

let contactInfo: HasEmail | HasPhoneNumber = Math.random() > 0.5
    ? {
        name: "Mike",
        phone: 1231212343242343
    }
    : {
        name: "Mike",
        email: "mike@example.com"
    };

console.log(contactInfo.name);
console.log(contactInfo.phone); // error TS2339: Property 'phone' does not exist on type 'HasPhoneNumber | HasEmail'.
console.log(contactInfo.email); // error TS2339: Property 'email' does not exist on type 'HasPhoneNumber | HasEmail'.
```

So, think of this as if you have this sort of Venn diagram, and it could be one side or the other, we are looking at the intersection between the two. We're looking at sort of that lens. We can only access things that are guaranteed to be there. And regardless of whether this is HasName or HasPhoneNumber, name is going to be there.

Union type

```javascript
let otherContactInfo : HasEmail & HasPhoneNumber = {
    name: "Mike",
    email: "mike@example.com",
    phone: 24234234234234
};

console.log(otherContactInfo);
```

So that's why we can access name and only name. Union types, they use this and operator and percentage worth and. And this is saying effectively. Other contact info is both a HasEmail and also a HasPhoneNumber. So it must be initialized with everything these two shapes have. The union, this will be the full Venn diagram, both bubbles.