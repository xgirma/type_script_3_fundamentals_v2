interface HasEmail {
    name: string;
    email: string;
}

interface HasPhoneNumber {
    name: string;
    phone: number;
}

// 01 class implement interfaces
export class Contact implements HasEmail {
    public email: string;
    public name: string;

    constructor(name: string, email: string) {
        this.email = email;
        this.name = name;
    }
}

// 02 Parameter Properties
class ParamPropContact implements HasEmail {
    constructor(
        public name: string,
        public email: string = "no email",
    ) {
        // nothing need
    }
}

// 03 Fields can have initializers
class OtherContact implements HasEmail, HasPhoneNumber {
    protected age: number = 0;
    private password!: string;

    constructor(
        public name: string,
        public email: string,
        public phone: number) {
        this.age = 35;
        this.password = Math.round(Math.random() * 1e14).toString(32);
    }
}

// 04 Abstract class
abstract class AbstractContact implements HasEmail, HasPhoneNumber {
    public abstract phone: number;

    constructor(
        public name: string,
        public email: string
    ){}

    abstract sendEmail(): void;
}

// 05 implementation of abstract class
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

// ...