// 01 Example: type
type StringOrNumber = string | number;
let x: string | number;
let y: StringOrNumber;

// x = false; // error TS2322: Type 'false' is not assignable to type 'string | number'.
// y = true; // error TS2322: Type 'false' is not assignable to type 'string | number'.

type HasName = { name: string };

let nameObj: HasName = {
  name: "Joe"
};

console.log(nameObj);

// 02 Example: interface extends other interfaces
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
