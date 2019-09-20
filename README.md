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

### Type Systems & Object Shapes
TypeScript is a structural type system, they only care about the shape of an object. Which is property names and types that are allowed for those properties, right? So it only cares about the structure of an object. So, if we had like a data structure for a car, we could call it car.

But really, all we care about is the fact that it has properties called make, model and year that are of the appropriate types. Same goes for functions. We really only care about the arguments and the return type. And if you create a totally different function that meets those criteria, that will end up being type equivalent.

TypeScript uses the term wider and narrower to describe a level of specificity.

    WIDE
    
    anything : any
    
    array : any[]
    
    array of strings : string[]
    
    array of 3 : [string, string, string]
    
    ... : ["abc", "def", string]
    
    nothing : never
    
    NAROW
    
### Functions
```javascript
function sendEmail(to: HasEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}`,
    body: "You are pre-qualified for loan!"
  };
}

const e = sendEmail({ name: "Paula", email: "paula@gmail.com" });
```

So this is a place where I tend to always use type annotations. And this is because I wanted to find the contract that this function has with other parts of my program.

Arrow function flavour 

```javascript
const sendTextEmail = (
  to: HasPhoneNumber
): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.phone}>`,
    body: "You are pre-qualified for loan!"
  };
};

const p = sendTextEmail({ name: "Paula", phone: 1231231234 });
console.log(p);
```

Rest params work just like you'd just expect, nothing really interesting here. The only thing you gotta be aware of is the type of a rest param has to be array-like.

```javascript
const sum = (...values: number[]) => values.reduce((sum, x) => sum + x);
console.log(sum(3, 4, 6));
```

Multiple function signature

```javascript
function contactPeople(
  method: "email" | "phone",
  ...people: (HasEmail | HasPhoneNumber)[]
): any {
  if (method === "email") {
    (people as HasEmail[]).forEach(sendEmail);
  } else {
    (people as HasPhoneNumber[]).forEach(sendTextMessage);
  }
}

const sendE = contactPeople("email", { name: "Paula", email: "p@go.com" });

const sendM = contactPeople("phone", { name: "Paula", phone: 1231231234 });

const sendEM = contactPeople("email", { name: "Paula", phone: 1231231234 }); // should not work, TODO update this example
```

## Interfaces & Type Aliases

### Type aliases
Type aliases, a really simple concept. It is literally giving a type a name. Any type that you can use with a variable, you can also create a type alias for.

```javascript
type StringOrNumber = string | number;
let x: string | number;
let y: StringOrNumber;

// x = false; // error TS2322: Type 'false' is not assignable to type 'string | number'.
// y = true; // error TS2322: Type 'false' is not assignable to type 'string | number'.
```

Type alias is actually more flexible than an interface.

```javascript
type HasName = { name: string };

let nameObj: HasName = {
  name: "Joe"
};

console.log(nameObj);
```

This is the only time you'll ever see a type up here on the right hand side of an equals.

### Extends
interfaces can extend from other interfaces, like same syntax that you're used to seeing with classes. Just remember that extends is used for inheritance of like things. Interfaces extend from interfaces, classes extend from classes.

```javascript
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasInternationalPhoneNumber extends HasPhoneNumber {
  countryCode: string;
}

const v: HasInternationalPhoneNumber = {
  name: "Jocy",
  phone: 1231231234,
  countryCode: "+9"
};

console.log(v);
```

### Call Signature using interface
We can use an interface to describe a call signature. And we're simply using parenthesis here to this describe a function.

We've not yet seen, and we won't see, an interface being able to handle primitive types, or operators used with types, like string or number. There is no way to describe that with an interface. So that's one clear difference we're seeing here. Type aliases are extremely flexible. They can handle the primitive stuff.

```javascript
interface ContactMessenger {
  (contact: HasEmail | HasPhoneNumber, message: string) : void
}
```

Type can handle most things that an interface can handle. Everything that an interface can handle. But interfaces are limited to JavaScript object and sub types which includes arrays and functions. Things that have prototypes, think of it that way. So here is a function signature.

```javascript
type ContactMessengerTwo = (
    (contact: HasEmail | HasPhoneNumber, message: string) => void
);
```

One cool thing about function types, a little prettier it's supposed to be right here. One cool thing about function types is we get something called contextual inference.

```javascript
interface ContactConstructor {
  new (...args: any[]) : HasEmail | HasPhoneNumber;
}
```

Construct signatures look very similar to call signatures. All you need is new head of that. You're used to seeing this in a class, right? Classes are something, they're new-able, we can use the new keyword with them. So this would be a way of describing a constructor that instantiates either things that have an email address or a phone number, and definitely have a name.

## Class
Extends is the only thing that we can use to describe inheriting from another entity in JavaScript, that you can say class extends base class. TypeScript introduces implements, and that describes a class aligning with a particular interface. So HasEmail, we know this type requires that everything have a name that's a string and an email that's a string.

What this means for any class that implements this interface, we have to make sure that these properties that conform to that interface are available and stated upfront. So, in terms of what this means up here, this is us declaring that these member data fields will exist. And their type is going to be a string.

```javascript
export class Contact implements HasEmail {
    public email: string;
    public name: string;

    constructor(name: string, email: string) {
        this.email = email;
        this.name = name;
    }
}
```

We can see right away that this is a lot, this is verbose. We have to specify email and name. Those words are here three times, right?

Parameter Properties.

    public - everyone
    
    protected - me and subclass
    
    private - only me
    
Abstract classes

```javascript
abstract class AbstractContact implements HasEmail, HasPhoneNumber {
    public abstract phone: number;

    constructor(
        public name: string,
        public email: string
    ){}

    abstract sendEmail(): void;
}
```

Implementation of abstract classes 

Abstract classes cannot be instantiated directly, they just serve as base classes. So unlike in interface, which also can't be instantiated, abstract classes can have implementations, right?

```javascript
class ConcreteContact extends AbstractContact {
    constructor(
        public phone: number,
        name: string,
        email: string
    ) {
        super(name, email)
    }

    sendEmail(){
        console.log("sending ...");
    }
}
```

