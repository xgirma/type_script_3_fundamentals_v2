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

```javascript
let address: [number, string, string, number] = [
    123,
    "Fake Street",
    "Nowhere, USA",
    10110
]
```
So, **tuple** is a fancy word. Just means array. It's an array of a fixed length, and an array that comes with a convention. So if we were to define a data structure that could contain a street address, we could use an object with property names like house number, street name, postal code, city. And then we can pluck things out as we need them.

### Object Types & Interfaces
```javascript
let obj : { housenumber: number, streetName: string }
```
Object types here, they look kind of like object-values, except instead of key-value, you have key type.