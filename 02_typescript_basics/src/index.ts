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
let ll: { houseNumber: number; streetNumber: number };

ll = {
  houseNumber: 3,
  streetNumber: 1533
};

// ll = {
//     streetNumber: 1533
// };
// error TS2741: Property 'houseNumber' is missing in type '{ streetNumber: number; }' but required in type '{ houseNumber: number; streetNumber: number; }'.

// 6. Example: optional operator (?) to
let m: { make: string; model?: number };

m = {
  make: "BMW"
};

// 7. Example: interface
interface Loc {
  longitude: number;
  latitude: number;
}

let lll: Loc = {
  longitude: 1242142342,
  latitude: 2352525
};

// 8. Example: Intersection type
interface HasPhoneNumber {
  name: string;
  phone: number;
}

interface HasEmail {
  name: string;
  email: string;
}

let contactInfo: HasEmail | HasPhoneNumber =
  Math.random() > 0.5
    ? {
        name: "Mike",
        phone: 1231212343242343
      }
    : {
        name: "Mike",
        email: "mike@example.com"
      };

console.log(contactInfo.name);
// console.log(contactInfo.phone); // error TS2339: Property 'phone' does not exist on type 'HasPhoneNumber | HasEmail'.
// console.log(contactInfo.email); // error TS2339: Property 'email' does not exist on type 'HasPhoneNumber | HasEmail'.

// 9. Example: Union type
let otherContactInfo: HasEmail & HasPhoneNumber = {
  name: "Mike",
  email: "mike@example.com",
  phone: 24234234234234
};

console.log(otherContactInfo);

// 10. Functions
function sendEmail(to: HasEmail): { recipient: string; body: string } {
  return {
    recipient: `${to.name} <${to.email}>`,
    body: "You are pre-qualified for loan!"
  };
}

const e = sendEmail({ name: "Paula", email: "paula@gmail.com" });
console.log(e);

// 10. Example: arrow function flavour
const sendTextMessage = (
  to: HasPhoneNumber
): { recipient: string; body: string } => {
  return {
    recipient: `${to.name} <${to.phone}>`,
    body: "You are pre-qualified for loan!"
  };
};

const p = sendTextMessage({ name: "Paula", phone: 1231231234 });
console.log(p);

// 11. Example rest params
const sum = (...values: number[]) => values.reduce((sum, x) => sum + x);
console.log(sum(3, 4, 6));

// 12: multiple function signature
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

const sendEM = contactPeople("email", { name: "Paula", phone: 1231231234 });
