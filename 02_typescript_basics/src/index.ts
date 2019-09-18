// 1. Example: simple array
let aa: number[] = [];
aa.push(33);
// aa.push("abc"); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.

// 2. Example: array of never
let bb = []; // equivalent to let bb: never[]
bb.push(66);
bb.push("xyz");

// 3. Example: element
let cc = [9];
cc.push(100);
// cc.push('pop'); // error TS2345: Argument of type '"abc"' is not assignable to parameter of type 'number'.

// 4. Example: tupple with fixed length
let address: [number, string, string, number] = [
  123,
  "Fake Street",
  "Nowhere, USA",
  10110
];

// address = [1, 2, 3, 4]; // Type 'number' is not assignable to type 'string'.

// 5. Example: object type
let ll : { houseNumber: number, streetNumber: number };

ll = {
    houseNumber: 3,
    streetNumber: 1533
};

// ll = {
//     streetNumber: 1533
// };
// error TS2741: Property 'houseNumber' is missing in type '{ streetNumber: number; }' but required in type '{ houseNumber: number; streetNumber: number; }'.

// 6. Example: optional operator (?) to
let m : { make: string, model?: number };

m = {
    make: "BMW"
};

// 7. Example: interface
interface Loc {
    longitude: number;
    latitude: number;
}

let lll : Loc = {
    longitude: 1242142342,
    latitude: 2352525
};
