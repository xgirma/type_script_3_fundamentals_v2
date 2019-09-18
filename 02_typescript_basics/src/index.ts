// Example: simple array
let aa: number[] = [];
aa.push(33);
// aa.push("abc"); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.

// Example: array of never
let bb = []; // equivalent to let bb: never[]
bb.push(66);
bb.push('xyz');

// Example: element
let cc = [9];
cc.push(100);
// cc.push('pop'); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.

// Example: tupple with fixed length
let address: [number, string, string, number] = [
    123,
    "Fake Street",
    "Nowhere, USA",
    10110
];

// address = [1, 2, 3, 4]; // Type 'number' is not assignable to type 'string'.
