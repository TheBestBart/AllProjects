export class Account {

    private _email: string;
    private _password: string;
    private _name: string;
    
    public constructor(emial: string, password: string, name?: string) {
        this._password = password;
        this._email = emial;
        this._name = name as string;
    }

    public setEmail = (emial: string):void => {
        this._email = emial;
    }

    public setPassword = (password: string):void => {
        this._password = password;
    }

    public setName = (name: string):void => {
        this._name = name;
    }


    public getEmail = (): string => {
        return this._email;
    }

    public getPassword = (): string => {
        return this._password;
    }

    public getName = (): string => {
        return !this._name ? this._email : this._name
    }
}
