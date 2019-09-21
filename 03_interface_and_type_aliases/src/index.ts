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

interface HasEmail {
  name: string;
  email: string;
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

// 03 Example: interface -> call signature
interface ContactMessenger {
  (contact: HasEmail | HasPhoneNumber, message: string): void;
}

// 04 Example: type -> call signature
type ContactMessengerTwo = (
  contact: HasEmail | HasPhoneNumber,
  message: string
) => void;

// 05 Example: Contextual inference
const emailer: ContactMessenger = (_contact, _message) => {
  /** ... */
};

// 06 Example: construct signature
interface ContactConstructor {
  new (...args: any[]): HasEmail | HasPhoneNumber;
}

// 07 Example:
interface PhoneNumberDict {
  [numberName: string]:
    | undefined
    | {
        areaCode: number;
        num: number;
      };
}

const d: PhoneNumberDict = {
  office: { areaCode: 123, num: 131212313 },
  home: { areaCode: 123, num: 131212313 }
};

// 08 Example
interface PhoneNumberDictionary {
  home: {
    areaCode: number;
    num: number;
  };

  office: {
    areaCode: number;
    num: number;
  };
}
